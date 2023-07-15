import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiningTable } from './dining-table';

const BASE_URL = 'https://localhost:7135/api/admin/Tables';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

const itemIndex = (item: DiningTable, data: DiningTable[]): number => {
  for (let idx = 0; idx < data.length; idx++)
  {
    if (data[idx].tableId === item.tableId)
    {
      return idx;
    }
  }

  return -1;
};

const cloneData = (data: DiningTable[]) => data.map((item) => Object.assign({}, item));

@Injectable()
export class DiningService extends BehaviorSubject<DiningTable[]> {
  private data: DiningTable[] = [];
  private originalData: DiningTable[] = [];
  private createdItems: DiningTable[] = [];
  private updatedItems: DiningTable[] = [];
  private deletedItems: DiningTable[] = [];

  constructor(private http: HttpClient) {
    super([]);
  }

  public read(): void {
    if (this.data.length) {
      return super.next(this.data);
    }

    this.fetch().subscribe(
      (response) => {
        const data = response.data;
        this.data = data;
        this.originalData = cloneData(data);
        super.next(data);
      },
      (error) => {
        // Handle the error
        console.error('Error: Failed to fetch data', error);
      }
    );
  }

  public create(item: DiningTable): void {
    const requestData = {
      tableId: item.tableId,
      tableNumber: item.tableNumber,
      capacity: item.capacity
    };

    this.http.post<any>(BASE_URL, requestData).subscribe(
      (response) => {
        const createdItem: DiningTable = {
          tableId: response.tableId,
          tableNumber: item.tableNumber,
          capacity: item.capacity
        };

        this.createdItems.push(createdItem);
        this.data.unshift(createdItem);
        super.next(this.data);
      },
      (error) => {
        // Handle the error
        console.error('Error: Failed to create a new food item', error);
      }
    );
  }

  public update(item: DiningTable): void {
    if (!this.isNew(item)) {
      const requestData = {
        tableId: item.tableId,
        tableNumber: item.tableNumber,
        capacity: item.capacity
      };
  
      this.http.put<any>(`${BASE_URL}/${item.tableId}`, requestData).subscribe(
        (response) => {
          const updatedItem: DiningTable = {
            tableId: item.tableId,
            tableNumber: item.tableNumber,
            capacity: item.capacity
          };
  
          const index = itemIndex(item, this.updatedItems);
          if (index !== -1) {
            this.updatedItems.splice(index, 1, updatedItem);
          } else {
            this.updatedItems.push(updatedItem);
          }
  
          super.next(this.data);
        },
        (error) => {
          // Handle the error
          console.error('Error: Failed to update the food item', error);
        }
      );
    } else {
      const index = this.createdItems.indexOf(item);
      this.createdItems.splice(index, 1, item);
    }
  }
  
  

  public remove(item: DiningTable): void {
    let index = itemIndex(item, this.data);
    this.data.splice(index, 1);

    index = itemIndex(item, this.createdItems);
    if (index >= 0) {
      this.createdItems.splice(index, 1);
    } else {
      this.deletedItems.push(item);
    }

    index = itemIndex(item, this.updatedItems);
    if (index >= 0) {
      this.updatedItems.splice(index, 1);
    }

    super.next(this.data);
  }

  public isNew(item: DiningTable): boolean {
    return !item.tableId;
  }

  public hasChanges(): boolean {
    return Boolean(this.deletedItems.length || this.updatedItems.length || this.createdItems.length);
  }


  public saveChanges(): void {
    if (!this.hasChanges()) {
      return;
    }
  
    const completed = [];
    if (this.deletedItems.length) {
      completed.push(this.fetch(REMOVE_ACTION, this.deletedItems));
    }
  
    if (this.updatedItems.length) {
      completed.push(this.fetch(UPDATE_ACTION, this.updatedItems));
    }
  
    if (this.createdItems.length) {
      completed.push(
        ...this.createdItems.map((item) =>
          this.createAndFetch(item)
        )
      );
    }
  
    this.reset();
  
    zip(...completed).subscribe(() => this.read());
  }
  
  private createAndFetch(item: DiningTable): Observable<any> {
    const requestData = {
        tableId: item.tableId,
        tableNumber: item.tableNumber,
        capacity: item.capacity
    };
  
    return this.http.post<any>(BASE_URL, requestData).pipe(
      map((response) => {
        const createdItem: DiningTable = {
            tableId: response.tableId,
            tableNumber: item.tableNumber,
            capacity: item.capacity
        };
  
        this.createdItems.push(createdItem);
        this.data.unshift(createdItem);
        super.next(this.data);
  
        return response; // Returning the response for further processing if needed
      })
    );
  }
  
//   public saveChanges(): void {
//     if (!this.hasChanges()) {
//       return;
//     }

//     const completed = [];
//     if (this.deletedItems.length) {
//       completed.push(this.fetch(REMOVE_ACTION, this.deletedItems));
//     }

//     if (this.updatedItems.length) {
//       completed.push(this.fetch(UPDATE_ACTION, this.updatedItems));
//     }

//     if (this.createdItems.length) {
//       completed.push(this.fetch(CREATE_ACTION, this.createdItems));
//     }

//     this.reset();

//     zip(...completed).subscribe(() => this.read());
//   }

  public cancelChanges(): void {
    this.reset();

    this.data = this.originalData;
    this.originalData = cloneData(this.originalData);
    super.next(this.data);
  }

  public assignValues(target: object, source: object): void {
    Object.assign(target, source);
  }

  private reset() {
    this.data = [];
    this.deletedItems = [];
    this.updatedItems = [];
    this.createdItems = [];
  }

  private fetch(action = '', data?: DiningTable[]): Observable<any> {
    let url = BASE_URL;
    if (action === UPDATE_ACTION && data && data.length === 1 && data[0].tableId) {
      url += `/${data[0].tableId}`;
    } else if (action === REMOVE_ACTION && data && data.length === 1 && data[0].tableId) {
      url += `/${data[0].tableId}`;
    }

    if (action === CREATE_ACTION || action === UPDATE_ACTION || action === REMOVE_ACTION) {
      return this.http.post<any>(url, data).pipe(map((res) => res));
    } else {
      return this.http.get<any>(url).pipe(map((res) => res));
    }
  }
}

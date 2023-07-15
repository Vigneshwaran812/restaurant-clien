import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { FoodCategory } from './food-category-data';

const BASE_URL = 'https://localhost:7135/api/admin/MenuCategoriesControllerAdmin';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

const itemIndex = (item: FoodCategory, data: FoodCategory[]): number => {
  for (let idx = 0; idx < data.length; idx++) {
    if (data[idx].menuCategoryId === item.menuCategoryId) {
      return idx;
    }
  }

  return -1;
};

const cloneData = (data: FoodCategory[]) => data.map((item) => Object.assign({}, item));

@Injectable()
export class CategoryService extends BehaviorSubject<FoodCategory[]> {
  private data: FoodCategory[] = [];
  private originalData: FoodCategory[] = [];
  private createdItems: FoodCategory[] = [];
  private updatedItems: FoodCategory[] = [];
  private deletedItems: FoodCategory[] = [];

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
        console.log(this.data);
        this.originalData = cloneData(data);
        super.next(data);
      },
      (error) => {
        // Handle the error
        console.error('Error: Failed to fetch data', error);
      }
    );
  }

  public create(item: FoodCategory): void {
    const createdItem: FoodCategory = {
     // Set menuCategoryId to null for a new item

      // menuCategoryId: item.menuCategoryId,
      categoryName: item.categoryName,
      
    };

    this.createdItems.push(createdItem);
    this.data.unshift(createdItem);
    super.next(this.data);
  }

  
public update(item: FoodCategory): void {
    if (!this.isNew(item)) {
      const index = itemIndex(item, this.updatedItems);
      if (index !== -1) {
        this.updatedItems.splice(index, 1, item);
      } else {
        this.updatedItems.push(item);
      }
    } else {
      const index = this.createdItems.indexOf(item);
      this.createdItems.splice(index, 1, item);
    }
  }

  

  public remove(item: FoodCategory): void {
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

  public isNew(item: FoodCategory): boolean {
    return !item.menuCategoryId;
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
        completed.push(this.saveDeletedItems(this.deletedItems));
      }
      if (this.updatedItems.length) {
        const updateRequests: Observable<any>[] = [];
        for (const item of this.updatedItems) {
          const requestData = {
            menuCategoryId: item.menuCategoryId,
            categoryName: item.categoryName,
           
          };
          updateRequests.push(this.saveUpdatedItems(item, requestData));
        }
        completed.push(forkJoin(updateRequests));
      }

    if (this.createdItems.length) {
      completed.push(this.saveCreatedItems()); // Call saveCreatedItems to save the created items
    }

    this.reset();

    zip(...completed).subscribe(() => this.read());
  }

  private saveCreatedItems(): Observable<any> {
    if (this.createdItems.length === 0) {
      return of(null);
    }

    return forkJoin(
        this.createdItems.map(item => {
          const requestData = item.categoryName;
           // menuCategoryId: item.menuCategoryId,
            
    
          return this.http.post<any>(BASE_URL, requestData).pipe(
            map(response => {
              // Update the menuCategoryId of the created item with the value from the response
              item.menuCategoryId = response.menuCategoryId;
              return response; // Returning the response for further processing if needed
            })
          );
        })
      );
  }

  private saveDeletedItems(items: FoodCategory[]): Observable<any> {
    const completed : any= [];
    items.forEach((item) => {
      completed.push(this.http.delete<any>(`${BASE_URL}/${item.menuCategoryId}`).pipe(
        map((response) => {
          // Handle the response if needed
          return response;
        })
      ));
    });

    return forkJoin(completed);
  }
  private saveUpdatedItems(item: FoodCategory, requestData: any): Observable<any> {
    const url = `${BASE_URL}/${item.menuCategoryId}`;
    return this.http.put(url, requestData);
  }
  



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

  private fetch(action = '', data?: FoodCategory[]): Observable<any> {
    let url = BASE_URL;
    if (action === UPDATE_ACTION && data && data.length === 1 && data[0].menuCategoryId) {
      url += `/${data[0].menuCategoryId}`;
    } else if (action === REMOVE_ACTION && data && data.length === 1 && data[0].menuCategoryId) {
      url += `/${data[0].menuCategoryId}`;
    }
    if (action === CREATE_ACTION || action === UPDATE_ACTION || action === REMOVE_ACTION) {
      console.log(data);
      return this.http.post<any>(url, data).pipe(map((res) => res));
    } else {
      return this.http.get<any>(url).pipe(map((res) => res));
    }
  }
}
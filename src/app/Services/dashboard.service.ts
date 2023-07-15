import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ServiceResponse<T> {
  Success: boolean;
  Message: string;
  Data: T;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<ServiceResponse<any[]>> {
    const url = 'https://localhost:7135/api/RegisteredCustomers';
    return this.http.get<ServiceResponse<any[]>>(url);
  }
  
  getCustomerCount(): Observable<ServiceResponse<any>>
  {
    const url = 'https://localhost:7135/CustomerCount';
    return this.http.get<ServiceResponse<any>>(url);
  }

  getFoodItemCount() : Observable<ServiceResponse<any>>
  {
    const url = 'https://localhost:7135/api/FoodItemsControllerAdmin/CountFoodItems';
    return this.http.get<ServiceResponse<any>>(url);
  }
   
  getReviews(): Observable<ServiceResponse<any[]>>
  {
    const url = 'https://localhost:7135/CustomerReviews';
    return this.http.get<ServiceResponse<any>>(url);
  }
}

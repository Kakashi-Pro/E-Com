import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order{
  id: number;
  transactionId: number;
  customerId: number;
  orderDate: Date;
  totalAmount: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl="http://localhost:5053";

  constructor(private http: HttpClient) { }

  // Get all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl+'/api/orders');
  }

  // Find order by ID
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl+'/api/orders/'+id);
  }

  // Delete order
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl+'/api/orders/'+id);
  }
}

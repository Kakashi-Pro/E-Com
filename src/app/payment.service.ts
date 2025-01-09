// payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from './product.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';


export interface PaymentResponse {
  url: string;
  stripePaymentMethodId:number;
  userId:number;
  amount:number;
  paymentType:string;
}

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  constructor(private http: HttpClient) {}
  private baseUrl="http://localhost:5053";
  product:Product|any;
  
  
   
  
  initiatePayment(product: Product) {
    const requestBody = {
      cartItems: [
        {
          price: product.price,
          productName: product.productName,
          quantity: product.quantity || 1 // Default to 1 if quantity is not provided
        }
      ]
    };
    // Make a request to your server or directly to the payment gateway
    return this.http.post<PaymentResponse>(this.baseUrl+'/api/payment/create-checkout-session', requestBody,{headers: new HttpHeaders({
      'Content-Type': 'application/json'})});
  }
  
  getPayment(): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(this.baseUrl+'/api/payment').pipe(
     catchError(this.handleError)
    );
 
}

private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
}
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductCategory } from './product.service';

export interface ProductCatagory{
  id: number;
  productType:string;
}
@Injectable({
  providedIn: 'root'
})



export class ProductcartagoryService {
  private baseUrl="http://localhost:5053";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductCatagory[]> {
    return this.http.get<ProductCatagory[]>(this.baseUrl+'/api/ProductCatagory').pipe(
     catchError(this.handleError)
    );
  }
  


  // For Authencation 
  
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

  


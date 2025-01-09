import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap } from 'rxjs/operators';



export interface Product {
  discount: any;
  id: number;
  productName: string;
  price: number;
  productdescription: string;
  imagePath:string;
  quantity:number;
}

export interface ProductCategory{
  id: number;
  productType: string;
}

@Injectable({
  providedIn: 'root'
})




export class ProductService{
  constructor(private http: HttpClient) { }
  
  private baseUrl="http://localhost:5053";
  
  
  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl+'/api/Product').pipe(
     catchError(this.handleError)
    );
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/api/Product', product);
  }
  
  addProductCategory(productCatagory: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/api/ProductCatagory', productCatagory,{headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })});
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/api/Product/${id}`);
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


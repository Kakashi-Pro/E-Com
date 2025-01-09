import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Seller{
  id: number;
   gsti_no:string;

   email:string;

   phoneNumber:string;

   Password:string
}

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private baseUrl="http://localhost:5053";

  constructor(private http: HttpClient) {}

  getSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.baseUrl+'/api/seller');
  }
}
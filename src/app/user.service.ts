import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';



export interface User{
  id: number;
  name: string;
  token:string;
  userRole:string;
  email?: string;
  password?: string;
  address: string;
  phoneNumber: string;
}

export interface Login{
  emailOrPhoneNumber:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRole: string |any;
  
  constructor(private http: HttpClient) { }
  
  private baseUrl="http://localhost:5053";
  private loggedIn = false;

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/api/user', user,{headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })});
  }

  Login(login:any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/api/user/login', login,{headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })});
  }

  Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
    
  }

  getUserDetails(id: number):Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+'/api/user/'+id).pipe(
      catchError(this.handleError)
     );
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl+'/api/user').pipe(
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

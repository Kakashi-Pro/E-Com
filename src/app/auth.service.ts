import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  login() {
    // Logic for login (e.g., authentication API call)
    this.isLoggedIn = true;
  }

  logout() {
    // Logic for logout (e.g., clearing tokens)
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}

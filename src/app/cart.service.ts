import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  id: number;
  productName: string;
  price: number;
  productdescription: string;
  imagePath: string;
  quantity: number;
  timestamp?: number; // Add timestamp property
}

export interface CartResponse {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  private readonly expirationTime = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  constructor(private http: HttpClient) {
    this.loadCartItems();
  }

  private baseUrl = "http://localhost:5053";

  initiatePayment(cartItems: CartItem[]) {
    return this.http.post<CartResponse>(this.baseUrl + '/api/payment/create-checkout-session', { cartItems }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Update quantity if the item already exists
      existingItem.timestamp = Date.now(); // Update timestamp
    } else {
      item.timestamp = Date.now(); // Set timestamp for new item
      this.cartItems.push(item); // Add new item
    }
    this.cartItemsSubject.next(this.cartItems); // Update the observable
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  loadCartItems(userId?: string) {
    const storedCartItems = localStorage.getItem('cartItems');
  
    // Only parse if storedCartItems is not null
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems) as CartItem[];
      this.cartItems = this.cartItems.filter(item => {
        // Remove items older than 2 hours
        return !item.timestamp || (Date.now() - item.timestamp < this.expirationTime);
      });
  
      this.cartItemsSubject.next(this.cartItems); // Update the observable
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); // Save the filtered items back to localStorage
    }
  }

  removeFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(this.cartItems);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); // Update local storage
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    localStorage.removeItem('cartItems'); // Clear local storage
  }

  getCartItems() {
    return this.cartItemsSubject.asObservable(); // Return an observable of the cart items
  }
}

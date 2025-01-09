import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { CartItem, CartResponse, CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  ProductQuantity: number = 0;
  isLoggedIn = false;
  items: CartItem[] = []; // Initialize as an empty array
  total = 0;
  private cartSubscription: Subscription = new Subscription(); // Declare and instantiate Subscription

  constructor(
    private cartService: CartService, 
    private userService: UserService, // Inject UserService correctly
    
  ) {}

  ngOnInit() {
    // Subscribe to the cart items observable
    this.cartSubscription = this.cartService.getCartItems().subscribe(items => {
      this.items = items ; // Ensure items is an array
      this.updateTotal(); // Calculate total after items are fetched
    });
  }

  buyNow() {
    this.isLoggedIn = this.userService.isLoggedIn(); // Check if the user is logged in
    if (this.isLoggedIn) {
      console.log('Login Successful');
      this.cartService.initiatePayment(this.items).subscribe(
        (response: CartResponse) => {
          console.log('Payment session created:', response.url);
          // Handle successful payment initiation (e.g., redirect to payment page)
          window.location.href = response.url;
        },
        (error: any) => {
          console.error('Payment initiation failed:', error);
          // Handle error
        }
      );
    }
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.cartSubscription.unsubscribe();
  }

  quantity(item: any, value: string) {
    if (value === 'max' && item.quantity < 5) {
      item.quantity++;
    } else if (value === 'min' && item.quantity > 1) {
      item.quantity--;
    }
    this.updateTotal();
    this.cartService.addToCart(item.quantity) // Update total whenever the quantity changes
  }

  updateTotal() {
    // Ensure that this.items is defined and is an array before calling reduce
    this.total = (Array.isArray(this.items) ? this.items : []).reduce((acc: number, item: CartItem) => {
      return acc + (item.price * item.quantity);
    }, 0);
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}

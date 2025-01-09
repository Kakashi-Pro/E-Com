// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product, ProductService } from '../product.service';
import { PaymentService } from '../payment.service';
import { UserService } from '../user.service';
import { CartItem, CartService } from '../cart.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  getDiscountedPrice(product: Product): number {
    return product.discount ? product.price - (product.price * product.discount / 100) : product.price;
}
  product: Product|any;
  isLoggedIn=false;
  style: any;

  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private paymentService:PaymentService,
    private cartService:CartService,
    private userService:UserService,
    private router:Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => this.product= data,
        error: (err) => console.error(err)
      });
    }
  }

 

  buyNow() {
    this.isLoggedIn = this.userService.isLoggedIn(); // Check if the user is logged in
    if (this.isLoggedIn==true) {
      console.log('Login Successful');

      // Proceed with payment
      this.paymentService.initiatePayment(this.product).subscribe(
        response => {
          // Handle response from the payment gateway
          console.log('Payment initiated:', response);
          window.location.href = response.url;
          
        },
        error => {
          console.error('Payment error:', error);
        }
      );
    } else {
      console.warn('User not logged in, redirecting to login page');
      this.router.navigate(['/login']); // Navigate to the login page
    }
  }



  addToCart() {
    const item: CartItem = {
      id: this.product.id, // Adjust based on your product model
      productName: this.product.productName,
      quantity: 1, // Assuming 1 for now; this can be modified based on UI
      price: this.product.price,
      productdescription: '',
      imagePath: '',

    };

    this.cartService.addToCart(item);
    console.log('Added to cart:', item);
  }
}


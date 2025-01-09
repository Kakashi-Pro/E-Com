import { Component } from '@angular/core';
import { Product, ProductService } from '../product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  products: Product[]=[]

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      error => console.error('There was an error!', error)   // Handle errors
    );
  }


  getDiscountedPrice(product: Product): number {
    return product.discount ? product.price - (product.price * product.discount / 100) : product.price;
}
}

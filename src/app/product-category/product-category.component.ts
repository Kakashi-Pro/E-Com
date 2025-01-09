import { Component, NgModule } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent {
  productCategory: any = {};
  constructor(private productService: ProductService) { }

  @NgModule({
    declarations: [
      // Declare components here if needed
    ],
    imports: [
      CommonModule,
      FormsModule
    ]
  })
  onSubmit(){
    if (this.productCategory.productType != null) {
      const formData = {productType: this.productCategory.productType}
      
    this.productService.addProductCategory(formData).subscribe({
      next: (response) => {
        console.log('Product Added:', response);
        // Reset the form or navigate to another page
        this.productCategory = {};
      },
      error: (error) => {
        console.error('Error adding product:', error);
        // Handle error
      }
    });
  } 
}
}


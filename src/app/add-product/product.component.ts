import { Component, NgModule } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class ProductComponent {
  product: any = {};
  selectedImage: File | null = null;

  constructor(private productService: ProductService, private http: HttpClient) { }

  @NgModule({
    declarations: [
      // Declare components here if needed
    ],
    imports: [
      CommonModule,
      FormsModule
    ]
  })
  
  onImageChange(event: any) {
    this.selectedImage = event.target.files[0];
  }

  

  onSubmit() {
    if (this.product.productName && this.product.price != null) {
      const formData = new FormData();
      formData.append('productName', this.product.productName);
      formData.append('price', this.product.price);
      formData.append('productDescription', this.product.productDescription);
      if (this.selectedImage) {
        formData.append('image', this.selectedImage, this.selectedImage.name);
      }

      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          console.log('Product Added:', response);
          // Reset the form or navigate to another page
          this.product = {};
          this.selectedImage = null;
        },
        error: (error) => {
          console.error('Error adding product:', error);
          // Handle error
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}

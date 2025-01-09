import { Component } from '@angular/core';
import { ProductcartagoryService } from '../productcartagory.service';

@Component({
  selector: 'app-productcatagory',
  templateUrl: './productcatagory.component.html',
  styleUrls: ['./productcatagory.component.css']
})

export class ProductcatagoryComponent {
isLoading: boolean = true; // To show loading spinner or similar UI
  error: string | null = null;
  products: any = {};
  constructor(private productcartagoryService : ProductcartagoryService) {}
  ngOnInit(): void {
    this.productcartagoryService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load user data';
        this.isLoading = false;
      },
    });

    
  }
}

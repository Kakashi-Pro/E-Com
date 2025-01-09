import { Component } from '@angular/core';
import { SellerService } from '../seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {

  constructor(private sellerService : SellerService) {}
  isLoading: boolean = true; // To show loading spinner or similar UI
  error: string | null = null;
  Seller: any = {};
  ngOnInit(): void {
    this.sellerService.getSellers().subscribe({
      next: (data) => {
        this.Seller = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load user data';
        this.isLoading = false;
      },
    });
  }
}

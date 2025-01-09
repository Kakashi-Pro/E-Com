import { Component } from '@angular/core';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css']
})
export class PaymentTableComponent {
  payment: any = {};
  isLoading: boolean = true; // To show loading spinner or similar UI
  error: string | null = null;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentService.getPayment().subscribe({
      next: (data) => {
        this.payment = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load user data';
        this.isLoading = false;
      },
    });
  }
}

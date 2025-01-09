import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-resigter',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class ResigterComponent {
  user: any = {};
  userValue: number = 3; 
  constructor(private userService: UserService) { }

  @NgModule({
    declarations: [
     
    ],
    imports: [
      CommonModule,
      FormsModule
    ]
  })

  setUserValue() {
    if (this.user.userRole === 'Admin') {
      this.userValue = 1;
    } else if (this.user.userRole === 'Seller') {
      this.userValue = 2;
    }
  }


 onSubmit(){
  this.setUserValue();
  if (this.user.password) {
    const formData = {
    name:this.user.name,
    address:this.user.address||'',
    email: this.user.email || '',
       
        password: this.user.password,
        userRole: this.user.userRole || '',
        phoneNumber: this.user.phoneNumber || '',
        token:this.user.token||'',
        value: this.userValue

    }
  this.userService.addUser(formData).subscribe({
    next: (response: any) => {

      console.log('Product Added:', response);
      // Reset the form or navigate to another page
      this.user = {};
    },
    error: (error: any) => {
      console.error('Error adding product:', error);
      // Handle error
    }
  });
} 
 }
}

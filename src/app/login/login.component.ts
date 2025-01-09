import { Component, NgModule } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login:any={};
  constructor(private userService: UserService, private http: HttpClient) { };
  
  @NgModule({
    declarations: [
      // Declare components here if needed
    ],
    imports: [
      CommonModule,
      FormsModule
    ]
  })
  onSubmit() {
  if (this.login.emailOrPhoneNumber != null) {
    const formData = {
      emailOrPhoneNumber: this.login.emailOrPhoneNumber,
      password: this.login.password,
      userRole:this.login.userRole,
    };

    this.userService.Login(formData).subscribe({
      
      next: (response) => {
        const token = response.token;
        localStorage.setItem('token', token);
        console.log('Login successful:', response);

        // Assuming the response contains the user ID
        const id = response.id;
        const name=response.name;
        const userRole=response.userRole;
         // Adjust according to your API response
        localStorage.setItem('id', id); // Store user ID for later use
        localStorage.setItem('name',name);
        localStorage.setItem("userRole",userRole);
        

        // Reset the form or navigate to another page
        this.login = {};
      },
      error: (error) => {
        console.error('Error during login:', error);
        // Handle error (e.g., show a message to the user)
      }
    });
  } 
}
}


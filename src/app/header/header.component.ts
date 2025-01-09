import { Component, HostListener, OnInit } from '@angular/core';
import { UserService,User } from '../user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})


export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isLoggedOut=false;
  showDropdown = false;
  name=localStorage.getItem('name');
  isAuthorization:boolean = false;
  isAdmin:boolean = false;
  router: any;
  // Default value
  constructor(private authService: UserService) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.checkAuthorization(); // Check login status on initialization
  }

  dropdownVisible: boolean = false;

 
checkAuthorization() {
 
  const userRole = localStorage.getItem('userRole');
  this.isAuthorization = (userRole === '2');
  this.isAdmin = (userRole === '1');
}

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn(); // Check if the user is logged in
    if (this.isLoggedIn==true) {
      console.log(' login Succesfully');
      } else {
        console.warn('Error');
      }
    }


    logout(){
      this.authService.Logout();
    }
  }



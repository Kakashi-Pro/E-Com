import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './add-product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';
import { FormsModule } from '@angular/forms';
import { ResigterComponent } from './User/User.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { subscribeOn } from 'rxjs';
import { UserTableComponent } from './user-table/user-table.component';
import { ProductcatagoryComponent } from './productcatagory/productcatagory.component';
import { PaymentTableComponent } from './payment-table/payment-table.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { SellerComponent } from './seller/seller.component';
import { OrdersComponent } from './orders/orders.component';
import { AbcComponent } from './abc/abc.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProductComponent,
    ResigterComponent,
    ProductCategoryComponent,
    LoginComponent,
    ProductDetailComponent,
    CartComponent,
    PaymentComponent,
    UserTableComponent,
    ProductcatagoryComponent,
    PaymentTableComponent,
    ProductsTableComponent,
    SellerComponent,
    OrdersComponent,
    AbcComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

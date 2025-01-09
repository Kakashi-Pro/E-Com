import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './add-product/product.component';
import { ResigterComponent } from './User/User.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { UserTableComponent } from './user-table/user-table.component';
import { ProductcatagoryComponent } from './productcatagory/productcatagory.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { SellerComponent } from './seller/seller.component';
import { PaymentTableComponent } from './payment-table/payment-table.component';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'product',component:ProductComponent},
  { path: 'product/:id', component: ProductDetailComponent },
  {path:'User',component:ResigterComponent},
  {path:'login',component:LoginComponent},
  {path:'ProductCategory',component:ProductCategoryComponent},
  { path: 'cart', component: CartComponent },
  { path: 'payment-success', component: PaymentComponent },
  { path: 'Users', component: UserTableComponent },
  {path:'ProductCategory-Table',component:ProductcatagoryComponent},
  {path:'Product-Table',component:ProductsTableComponent},
  {path:'Seller-Table',component:SellerComponent},
  { path: 'Payment', component: PaymentTableComponent },
  { path: 'Orders', component: OrdersComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }

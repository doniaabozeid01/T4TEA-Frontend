import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductInCategoryComponent } from './Components/product-in-category/product-in-category.component';
import { AllproductsComponent } from './Components/allproducts/allproducts.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AuthComponent } from './Components/auth/auth.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { CartComponent } from './Components/cart/cart.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { AllOrdersComponent } from './Components/all-orders/all-orders.component';





const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'product/:id', component:ProductInCategoryComponent},
  {path:'all-products', component:AllproductsComponent},
  {path:'product-details/:id', component:ProductDetailsComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'wishlist', component: WishListComponent},
  { path: 'cart', component: CartComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'all-orders', component: AllOrdersComponent},
  {path:'**', redirectTo:'home', pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}




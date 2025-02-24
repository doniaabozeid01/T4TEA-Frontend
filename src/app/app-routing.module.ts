import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductInCategoryComponent } from './Components/product-in-category/product-in-category.component';
import { AllproductsComponent } from './Components/allproducts/allproducts.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AuthComponent } from './Components/auth/auth.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { CartComponent } from './Components/cart/cart.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { AllOrdersComponent } from './Components/all-orders/all-orders.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { authGuard } from './guard/auth.guard';





const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'product/:id', component:ProductInCategoryComponent},
  {path:'all-products', component:AllproductsComponent},
  {path:'product-details/:id', component:ProductDetailsComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'wishlist', component: WishListComponent , canActivate: [authGuard] },
  { path: 'cart', component: CartComponent , canActivate: [authGuard] },
  { path: 'payment', component: PaymentComponent , canActivate: [authGuard] },
  { path: 'all-orders', component: AllOrdersComponent , canActivate: [authGuard] },
  { path: 'review/:orderId', component: ReviewsComponent , canActivate: [authGuard] },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  {path:'**', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}




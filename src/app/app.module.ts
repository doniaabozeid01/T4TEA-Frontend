import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { ProductInCategoryComponent } from './Components/product-in-category/product-in-category.component';
import { AllproductsComponent } from './Components/allproducts/allproducts.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AuthComponent } from './Components/auth/auth.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { CartComponent } from './Components/cart/cart.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SliceGroupsPipe } from './Pipes/slice-groups.pipe';
import { PaymentComponent } from './Components/payment/payment.component';
import { AllOrdersComponent } from './Components/all-orders/all-orders.component';  // استيراد SwiperModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductInCategoryComponent,
    AllproductsComponent,
    ProductDetailsComponent,
    LoginComponent,
    SignupComponent,
    AuthComponent,
    WishListComponent,
    CartComponent,
    FooterComponent,
    SliceGroupsPipe,
    PaymentComponent,
    AllOrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    TooltipModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

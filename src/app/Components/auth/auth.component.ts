import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isSignUp = false; // متغير لتحديد الحالة الحالية

  constructor(private router:Router){}
  togglePanel() {
    this.isSignUp = !this.isSignUp;
  }


  signIn():void{
    this.router.navigate(['/home']);
  }

  signUp():void{
    this.router.navigate(['/home']);
  }





}




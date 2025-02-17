import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // constructor(private router :Router){}

  // goToSignUp():void{    
  //   this.router.navigate(['/signup'])
  // }


  isLogin = true; // تحديد ما إذا كان النموذج هو تسجيل الدخول أم الاشتراك

  // تبديل بين تسجيل الدخول وتسجيل الاشتراك
  toggleForm() {
    this.isLogin = !this.isLogin;
  }
}

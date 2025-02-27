import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApisService } from 'src/app/Services/call-apis.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isSignUp = false;

  loginData = { email: '', password: '' };
  registerData = { fullName: '', email: '', password: '' };

  errors = { login: '', register: '' };
  isAdding: boolean = false;

  constructor(private router: Router, private callApi: CallApisService) { }

  togglePanel() {
    this.isSignUp = !this.isSignUp;
    this.errors = { login: '', register: '' }; // مسح الأخطاء عند التبديل
  }

  validateEmail(email: string): boolean {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d).{6,}$/; // على الأقل 6 حروف، بها رقم وحرف صغير
    return passwordRegex.test(password);
  }

  signIn(): void {
    console.log("sign in : ",this.loginData  );
    this.isAdding= true;

    this.errors.login = '';

    if (!this.loginData.email || !this.loginData.password) {
      this.isAdding= false;

      this.errors.login = 'يجب ملء جميع الحقول.';
      return;
    }

    if (!this.validateEmail(this.loginData.email)) {
      this.isAdding= false;
      this.errors.login = 'البريد الالكتروني او الباسورد غير صحيح';
      return;
    }

    if (!this.validatePassword(this.loginData.password)) {
      this.isAdding= false;
      this.errors.login = 'البريد الالكتروني او الباسورد غير صحيح';
      return;
    }

    console.log('تسجيل الدخول:', this.loginData);
    this.callApi.Login(this.loginData).subscribe({
      next: (response) => {
        this.isAdding= false;
        console.log(response.token);
        localStorage.setItem('Token', response.token)
        this.router.navigate(['/home']);

      },
      error: (err) => {
        this.isAdding= false;
        console.log(err.error.message);
        if(err.error.message == "Invalid email or password"){
          this.errors.login = 'البريد الالكتروني او الباسورد غير صحيح';
        }
        else{
          this.errors.login = err.error.message;
        }
      }
    });
    
  }

  signUp(): void {

    this.isAdding= true;
    this.errors.register = '';

    if (!this.registerData.fullName || !this.registerData.email || !this.registerData.password) {
      this.isAdding= false;

      this.errors.register = 'يجب ملء جميع الحقول.';
      return;
    }

    if (!this.validateEmail(this.registerData.email)) {
      this.isAdding= false;
      this.errors.register = 'يجب أن يكون البريد الإلكتروني Gmail.';
      return;
    }

    if (!this.validatePassword(this.registerData.password)) {
      this.isAdding= false;
      this.errors.register = 'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل، رقم واحد، وحرف صغير.';
      return;
    }

    console.log('إنشاء حساب:', this.registerData);
    this.callApi.Register(this.registerData).subscribe({
      next: (response) => {
        this.isAdding= false;
        console.log(response);
        localStorage.setItem('Token', response.token)
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isAdding= false;
        console.log(err);
        this.errors.register = err.error
      }
    })
    // this.router.navigate(['/home']);
  }



  showPassword: boolean = false; // يتحكم في عرض/إخفاء كلمة المرور

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallApisService } from 'src/app/Services/call-apis.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {



  forgotPasswordForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = false; // حالة تحميل لتفعيل الـ spinner

  constructor(private fb: FormBuilder, private callApi: CallApisService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    this.isLoading = true;  // تفعيل الـ spinner عند الضغط على الزر
    if (this.forgotPasswordForm.valid) {
      this.errorMessage = null;
      this.successMessage = null;
      console.log(this.forgotPasswordForm.value.email);
      if (this.forgotPasswordForm.value.email.split('@')[1] != 'gmail.com') {
        this.errorMessage = 'يجب ادخال بريد الكتروني صحيح'
      }

      else {
        this.callApi.ForgotPassword(this.forgotPasswordForm.value).subscribe({
          next: (response) => {
            console.log(response);
            this.isLoading = false;
            this.successMessage = 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.';
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;

            this.errorMessage = 'حدث خطأ، يرجى المحاولة مرة أخرى.';
          }
        });
      }


    }
  }




}

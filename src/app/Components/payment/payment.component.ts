import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApisService } from 'src/app/Services/call-apis.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  loading: boolean = false; // إيقاف التحميل عند النجاح

  paymentForm: FormGroup;
  userId: any;
  constructor(private fb: FormBuilder, private router: Router, private callApi: CallApisService) {
    this.paymentForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10,15}$')]],
      confirmPhone: ['', Validators.required],
      paymentMethod: ['cash', Validators.required]
    }, { validators: this.phoneMatchValidator });
  }

  ngOnInit(): void {
    this.callApi.getUserId().subscribe({
      next: (response) => {
        console.log(response);
        this.userId = response.userId;
      }
    })
  }

  phoneMatchValidator(form: FormGroup) {
    return form.get('phone')?.value === form.get('confirmPhone')?.value
      ? null
      : { phoneMismatch: true };
  }

  onSubmit() {
    this.loading = true; // إيقاف التحميل عند النجاح

    if (this.paymentForm.valid) {
      console.log('Form Data:', this.paymentForm.value);


      var orderData = {
        userId: this.userId,
        paymentMethod: this.paymentForm.value.paymentMethod,
        country: this.paymentForm.value.country,
        city: this.paymentForm.value.city,
        address: this.paymentForm.value.address,
        phoneNumber: this.paymentForm.value.phone,
      }
      console.log(orderData);

      this.callApi.createOrder(orderData).subscribe({
        next: (response) => {
          this.loading = false; // إيقاف التحميل عند النجاح

          console.log(response);
          this.callApi.updateCartCount(this.userId);

          this.router.navigate(['/all-orders'])
        },
        error:(err)=>{
          this.loading = false; // إيقاف التحميل عند النجاح
        }
      })


    }
  }


}

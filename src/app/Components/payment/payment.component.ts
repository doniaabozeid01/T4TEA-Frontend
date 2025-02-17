import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) {
    this.paymentForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10,15}$')]],
      confirmPhone: ['', Validators.required],
      paymentMethod: ['cash', Validators.required]
    }, { validators: this.phoneMatchValidator });
  }

  phoneMatchValidator(form: FormGroup) {
    return form.get('phone')?.value === form.get('confirmPhone')?.value
      ? null
      : { phoneMismatch: true };
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      console.log('Form Data:', this.paymentForm.value);
      this.router.navigate(['/all-orders'])
    }
  }

  
}

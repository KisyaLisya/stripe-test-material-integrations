import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Stripe } from '../stripe';
import { PaymentMethodResult } from '../stripe/stripe-definitions/payment-method';
import { PaymentIntent, PaymentIntentData, PaymentIntentResult } from '../stripe/stripe-definitions/payment-intent';

@Component({
  selector: 'app-bank-card-form',
  templateUrl: './bank-card-form.component.html',
  styleUrls: ['./bank-card-form.component.scss']
})
export class BankCardFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: [],
    cardNumberElement: [],
    expiryElement: [],
    cvcElement: [],
  });
  loading: boolean;

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get cardNumberControl(): FormControl {
    return this.form.get('cardNumberElement') as FormControl;
  }

  get expiryControl(): FormControl {
    return this.form.get('expiryElement') as FormControl;
  }

  get cvcControl(): FormControl {
    return this.form.get('cvcElement') as FormControl;
  }

  constructor(private fb: FormBuilder, private stripe: Stripe) { }

  ngOnInit(): void {
    console.log('stripe', this.stripe);
  }

  onPay(): void {
    const { name, cardNumberElement } = this.form.value;

    this.loading = true;
    this.form.disable();

    // need to make request to backend to get a client secret and then call confirmCardPayment with this clientSecret value
    const clientSecret = '123_secret_456';

    try {
      this.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name
          }
        },
        setup_future_usage: 'off_session'
      } as PaymentIntentData)
        .then((data: PaymentIntentResult) => {
          console.log('PaymentIntentResult is ', data);
          this.loading = false;
          this.form.enable();
        })
        .catch((err: Error) => {
          console.log('Error happened in promise');
          console.error(err);
          this.loading = false;
          this.form.enable();
        });
    } catch (e) {
      console.log('Error happened in try catch');
      console.error(e);
      this.loading = false;
      this.form.enable();
    }

  }
}

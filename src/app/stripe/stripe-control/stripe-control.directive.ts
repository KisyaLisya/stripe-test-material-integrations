import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ControlValueAccessor, Validator, ValidationErrors } from '@angular/forms';
import { StripeElement } from '../stripe-element';

/**
 * Bridges the StripeElement with the Angular's form API implementing both a ControlValueAccessor
 * and a sync Validator enabling the use with FormControl
 */
@Directive({
  selector: `
    app-stripe-card[ngModel],
    app-stripe-card[formControl],
    app-stripe-card[formControlName],
    app-stripe-card-num[ngModel],
    app-stripe-card-num[formControl],
    app-stripe-card-num[formControlName],
    app-stripe-card-expiry[ngModel],
    app-stripe-card-expiry[formControl],
    app-stripe-card-expiry[formControlName],
    app-stripe-card-cvc[ngModel],
    app-stripe-card-cvc[formControl],
    app-stripe-card-cvc[formControlName]
  `,
  exportAs: 'StripeControl',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StripeControlDirective), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => StripeControlDirective), multi: true  }
  ]
})
export class StripeControlDirective implements ControlValueAccessor, Validator {

  constructor(readonly element: StripeElement<any>) { }

  /**
   * Called by the forms API to write to the view when programmatic changes from model to view are requested.
   * NOTE: Only clearing the control is allowed
   */
  writeValue(value: any): void {
    !value && this.element.clear();
  }

  /**
   * Registers a callback function that is called when the control's value changes in the UI.
   * The value passed along the FormControl is the stripe Element instance to be used in the
   * payment_method object to setup or confirm the payment.
   */
  registerOnChange(fn: (_:any) => void): void {

    this.element.valueChange.subscribe( value => fn(value.complete ? this.element.element : null) );
  }

  /** Registers a callback function is called by the forms API on initialization to update the form model on blur. */
  registerOnTouched(fn: () => void): void {

    this.element.blurChange.subscribe( () => fn() );
  }

  /**
   * Function that is called by the forms API when the control status changes to or from 'DISABLED'.
   * Depending on the status, it enables or disables the appropriate DOM element.
   */
  setDisabledState(disabled: boolean): void {

    this.element.update({ disabled });
  }

  /** Performs synchronous validation against the provided control. */
  validate(control: AbstractControl): ValidationErrors | null {

    const errorType = this.element.error && this.element.error.type;

    return errorType ? { [errorType]: true } : null;
  }
}

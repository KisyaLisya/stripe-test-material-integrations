import { Component, Inject, forwardRef, Input, ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Elements, IconStyle, CardElementOptions, CardFieldElementOptions } from '../stripe-definitions/element';
import { StripeConfig, StripeConfigToken } from '../stripe-factory';
import { StripeElement } from '../stripe-element';

/** Stripe Card Element for Angular */
@Component({
  selector: 'app-stripe-card-expiry',
  template: '',
  providers: [
    { provide: StripeElement, useExisting: forwardRef(() => StripeCardExpiryComponent) }
  ]
})
export class StripeCardExpiryComponent extends StripeElement<'cardExpiry'> {

  constructor(elements: Elements, @Inject(StripeConfigToken) config: StripeConfig, ref: ElementRef<HTMLElement>) {
    super('cardExpiry', elements, config, ref);
  }

  /** Card specific options */
  protected get options(): CardFieldElementOptions {
    return {
     disabled: this.disabled,
    };
  };

  /** Disables the Card control */
  @Input('disabled') set disableSetter(value: boolean) { this.disabled = coerceBooleanProperty(value); }
  public disabled = false;

}

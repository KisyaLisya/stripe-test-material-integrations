import { Component, Inject, forwardRef, Input, ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Elements, IconStyle, CardElementOptions, CardFieldElementOptions } from '../stripe-definitions/element';
import { StripeConfig, StripeConfigToken } from '../stripe-factory';
import { StripeElement } from '../stripe-element';

@Component({
  selector: 'app-stripe-card-cvc',
  template: '',
  providers: [
    { provide: StripeElement, useExisting: forwardRef(() => StripeCardCvcComponent) }
  ]
})
export class StripeCardCvcComponent extends StripeElement<'cardCvc'> {

  constructor(elements: Elements, @Inject(StripeConfigToken) config: StripeConfig, ref: ElementRef<HTMLElement>) {
    super('cardCvc', elements, config, ref);
  }

  /** Card specific options */
  protected get options(): CardFieldElementOptions {
    return {
     disabled: this.disabled,
    };
  }

  /** Disables the Card control */
  @Input('disabled') set disableSetter(value: boolean) { this.disabled = coerceBooleanProperty(value); }
  public disabled = false;
}

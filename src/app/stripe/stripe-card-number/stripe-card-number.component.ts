import { Component, Inject, forwardRef, Input, ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Elements, IconStyle, CardElementOptions, CardFieldElementOptions } from '../stripe-definitions/element';
import { StripeConfig, StripeConfigToken } from '../stripe-factory';
import { StripeElement } from '../stripe-element';

/** Stripe Card Element for Angular */
@Component({
  selector: 'app-stripe-card-num',
  template: '',
  providers: [
    { provide: StripeElement, useExisting: forwardRef(() => StripeCardNumberComponent) }
  ]
})
export class StripeCardNumberComponent extends StripeElement<'cardNumber'> {

  constructor(elements: Elements, @Inject(StripeConfigToken) config: StripeConfig, ref: ElementRef<HTMLElement>) {
    super('cardNumber', elements, config, ref);
  }

  /** Card specific options */
  protected get options(): CardFieldElementOptions {
    return {
     disabled: this.disabled,
    };
  };

  /** The brand of the Card */
  get brand(): string { return super.value && super.value.brand || ''; }

  /** Disables the Card control */
  @Input('disabled') set disableSetter(value: boolean) { this.disabled = coerceBooleanProperty(value); }
  public disabled = false;

  /** Hides the card icon */
  @Input('hideIcon') set hideIconSetter(value: boolean) { this.hideIcon = coerceBooleanProperty(value); }
  public hideIcon: boolean;

  /** Selects the icon style */
  @Input() iconStyle: IconStyle;
}

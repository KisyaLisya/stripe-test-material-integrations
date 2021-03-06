import { InjectionToken } from '@angular/core';
import { ElementsOptions, ElementType, ElementOptions } from './stripe-definitions/element';
import { StripeJS, Stripe, StripeOptions } from './stripe-definitions';

export interface StripeConfig<T extends ElementType = any> {
  publicKey: string;
  options? : StripeOptions;
  elementsOptions?: ElementsOptions;
  elementOptions?: ElementOptions<T>;
}

export const StripeConfigToken = new InjectionToken<StripeConfig>('wizdm.stripe.config');

/** Retrives the global StripeJS object  */
export function getStripeJS(): StripeJS {
  return (!!window ? (window as any).Stripe : undefined);
}

/** Stripe.js v3 script loader */
export function loadStripeJS(): Promise<StripeJS> {

  // Verifies whenever stripejs has already being loaded
  const StripeJS = getStripeJS();

  // Returns the existing stripejs instance or load the script
  return StripeJS ? Promise.resolve( StripeJS ) : new Promise( (resolve, reject) => {

    const script = document.createElement('script');

    script.src = 'https://js.stripe.com/v3/';
    script.type = 'text/javascript';
    script.defer = true;
    script.async = true;

    script.onerror = () => reject( new Error('Unable to load StripeJS') );
    script.onload = () => resolve( getStripeJS() );

    document.body.appendChild(script);
  });
}

/** Instantiates a Stripe istance accoding to the provided options */
export function stripeFactory(config: StripeConfig): Stripe {

  // tslint:disable-next-line:no-shadowed-variable
  const StripeJS = getStripeJS();
  if(!StripeJS) {
    throw new Error('StripeJS loading failed');
  }

  if(!config || typeof config.publicKey !== 'string') {
    throw new Error('A valid publicKey must be provided');
  }

  return StripeJS( config.publicKey, config.options );
}

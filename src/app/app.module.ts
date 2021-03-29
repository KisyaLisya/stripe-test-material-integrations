import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankCardFormComponent } from './bank-card-form/bank-card-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StripeModule } from './stripe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    BankCardFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StripeModule.init({
      publicKey: 'pk_test_ScThoGfGM6uXJgQPt0D3R1r400FyDt2uRD',
      elementsOptions: {
        fonts: [
          {cssSrc: 'https://fonts.googleapis.com/css?family=Ubuntu:400,700'}
        ]
      },
      elementOptions: {
        style: {
          base: {
            fontFamily: 'Ubuntu, sans-serif'
          }
        }
      }
    }),
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

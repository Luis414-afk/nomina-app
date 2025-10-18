/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { CUSTOM_ELEMENTS_SCHEMA, NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { register } from 'swiper/element/bundle';

register();
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule
  ],
  declarations: [WelcomePage]
})
export class WelcomePageModule { }

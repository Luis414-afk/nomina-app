/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/

import { NgModule, LOCALE_ID } from '@angular/core';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgCalendarModule  } from 'ionic2-calendar';
import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';
import { CalendarioComponent } from './calendario.component';
import { DetallePopoverComponent } from './detalle-popover/detalle-popover.component'


import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { IonCalendarModule } from '@heliomarpm/ion-calendar';
registerLocaleData(localeEs, 'es');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    NgCalendarModule,
    IonCalendarModule
  ],
  declarations: [CalendarioComponent,DetallePopoverComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' } // Establece el locale a español
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarioPageModule { }

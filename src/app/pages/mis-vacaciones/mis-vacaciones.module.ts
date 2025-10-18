/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAsistenciasPageRoutingModule } from './mis-vacaciones-routing.module';

import { MisVacionesComponent } from './mis-vacaciones.component';
import { DetallePopoverComponent } from './detalle-popover/detalle-popover.component'
import { SolicitudVacacionComponent } from './solicitud-vacaciones/solicitud-vacaciones.component'
import { NgCalendarModule  } from 'ionic2-calendar';
import { SelectorFechasComponent } from './selector-fechas/selector-fechas.component';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { IonCalendarModule } from '@heliomarpm/ion-calendar';

registerLocaleData(localeEs, 'es');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAsistenciasPageRoutingModule,
    NgCalendarModule,
    IonCalendarModule
  ],
  declarations: [
    MisVacionesComponent,
    DetallePopoverComponent,
    SolicitudVacacionComponent,
    SelectorFechasComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' } // Establece el locale a español
  ],
})
export class MisVacacionesPageModule { }

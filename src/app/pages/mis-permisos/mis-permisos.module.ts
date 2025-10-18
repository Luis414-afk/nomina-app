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

import { MenuPermisosPageRoutingModule } from './mis-permisos-routing.module';

import { MisPermisosComponent } from './mis-permisos.component';
import { DetallePopoverComponent } from './detalle-popover/detalle-popover.component'
import { SolicitudPermisoComponent } from './solicitud-permiso/solicitud-permiso.component'
import { NgCalendarModule  } from 'ionic2-calendar';
import { SelectorFechasComponent } from './selector-fechas/selector-fechas.component';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { IonCalendarModule } from '@heliomarpm/ion-calendar';
import { SelectorTiempoComponent } from './selector-tiempo/selector-tiempo.component'
registerLocaleData(localeEs, 'es');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPermisosPageRoutingModule,
    NgCalendarModule,
    IonCalendarModule
  ],
  declarations: [
    MisPermisosComponent,
    DetallePopoverComponent,
    SolicitudPermisoComponent,
    SelectorFechasComponent,
    SelectorTiempoComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' } // Establece el locale a español
  ],
})
export class MisPermisosPageModule { }

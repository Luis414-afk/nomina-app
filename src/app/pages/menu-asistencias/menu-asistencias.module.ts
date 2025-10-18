/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAsistenciasPageRoutingModule } from './menu-asistencias-routing.module';

import { MenuAsistenciasComponent } from './menu-asistencias.component';
import { MiAsistenciasComponent } from './mi-asistencias/mi-asistencias.component';
import { MiChecadorComponent } from './mi-checador/mi-checador.component';
import { MiDashboardComponent } from './mi-dashboard/mi-dashboard.component';

import { DetalleAsistenciasComponent } from './modals/detalle-asistencias/detalle-asistencias.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAsistenciasPageRoutingModule
  ],
  declarations: [
    MenuAsistenciasComponent,
    MiAsistenciasComponent,
    MiChecadorComponent,
    MiDashboardComponent,
    DetalleAsistenciasComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MenuAsistenciasPageModule { }

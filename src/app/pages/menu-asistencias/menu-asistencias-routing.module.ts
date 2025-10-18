/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuAsistenciasComponent } from './menu-asistencias.component';
import { MiAsistenciasComponent } from './mi-asistencias/mi-asistencias.component';
import { MiChecadorComponent } from './mi-checador/mi-checador.component';
import { MiDashboardComponent } from './mi-dashboard/mi-dashboard.component';




const routes: Routes = [
  {
    path: '',
    component: MenuAsistenciasComponent,
    children: [
      { path: 'historial', component: MiAsistenciasComponent },
      { path: 'dashboard', component: MiDashboardComponent },
      { path: '', redirectTo: 'historial', pathMatch: 'full' }
    ]
  },
  {
    path: 'checador-digital',
    component: MiChecadorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAsistenciasPageRoutingModule { }

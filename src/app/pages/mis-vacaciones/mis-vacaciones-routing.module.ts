/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisVacionesComponent } from './mis-vacaciones.component';

import { SolicitudVacacionComponent } from './solicitud-vacaciones/solicitud-vacaciones.component'

const routes: Routes = [
  {
    path: '',
    component: MisVacionesComponent,
   
  },
  {
    path: 'solicitar-vacaciones',
    component: SolicitudVacacionComponent,
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAsistenciasPageRoutingModule { }

/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisPermisosComponent } from './mis-permisos.component';

import { SolicitudPermisoComponent } from './solicitud-permiso/solicitud-permiso.component'

const routes: Routes = [
  {
    path: '',
    component: MisPermisosComponent,
   
  },
  {
    path: 'solicitar-permiso',
    component: SolicitudPermisoComponent,
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPermisosPageRoutingModule { }

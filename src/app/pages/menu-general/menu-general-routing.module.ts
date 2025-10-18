/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuGeneralComponent } from './menu-general.component';




const routes: Routes = [
  {
    path: '',
    component: MenuGeneralComponent
  },
  {
    path: 'calendario',
    loadChildren: () =>
      import('../../pages/calendario/calendario.module').then(
        (m) => m.CalendarioPageModule
      ),
  },
  {
    path: 'menu-asistencias',
    loadChildren: () =>
      import('../../pages/menu-asistencias/menu-asistencias.module').then(
        (m) => m.MenuAsistenciasPageModule
      ),
  },
  {
    path: 'recibos-nomina',
    loadChildren: () => import('../../pages/recibos-nomina/recibos-nomina.module').then(m => m.RecibosNominaPageModule)
  },
  {
    path: 'organigrama',
    loadChildren: () => import('../../pages/organigrama/organigrama.module').then(m => m.OrganigramaPageModule)
  },
  {
    path: 'mis-vacaciones',
    loadChildren: () => import('../../pages/mis-vacaciones/mis-vacaciones.module').then(m => m.MisVacacionesPageModule)
  },
  {
    path: 'mis-permisos',
    loadChildren: () => import('../../pages//mis-permisos/mis-permisos.module').then(m => m.MisPermisosPageModule)
  },
 
 
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuGeneralPageRoutingModule { }

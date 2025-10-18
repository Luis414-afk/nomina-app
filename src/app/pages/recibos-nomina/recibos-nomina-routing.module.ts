/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecibosNominaComponent } from './recibos-nomina.component';
import { HistorialComponent } from './historial/historial.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: RecibosNominaComponent,
    children: [
      { path: 'historial', component: HistorialComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'historial', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecibosNominaPageRoutingModule { }

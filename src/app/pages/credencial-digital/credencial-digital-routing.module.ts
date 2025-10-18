/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CredencialDigitalComponent } from './credencial-digital.component';

const routes: Routes = [
  {
    path: '',
    component: CredencialDigitalComponent
  },
  {
    path: 'credencial',
    loadChildren: () =>
      import('../credencial-digital/credencial-digital.module').then((m) => m.CredencialDigitalPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CredencialDigitalPageRoutingModule { }

/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'credencial',
    loadChildren: () =>
      import('../../pages/credencial-digital/credencial-digital.module').then(
        (m) => m.CredencialDigitalPageModule
      ),
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('../../pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('../../pages/notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
  },
  {
    path: 'security',
    loadChildren: () => import('../../pages/security/security.module').then(m => m.SecurityPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('../../pages/terms/terms.module').then(m => m.TermsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule { }

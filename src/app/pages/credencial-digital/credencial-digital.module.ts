/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CredencialDigitalPageRoutingModule } from './credencial-digital-routing.module';

import { CredencialDigitalComponent } from './credencial-digital.component';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CredencialDigitalPageRoutingModule,
    QRCodeModule
  ],
  declarations: [CredencialDigitalComponent]
})
export class CredencialDigitalPageModule { }

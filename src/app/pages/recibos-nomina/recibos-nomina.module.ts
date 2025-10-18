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
import { RecibosNominaPageRoutingModule } from './recibos-nomina-routing.module';
import { RecibosNominaComponent } from './recibos-nomina.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { HistorialComponent } from './historial/historial.component';
import { DashboardComponent } from './dashboard/dashboard.component';



import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  declarations: [
    RecibosNominaComponent,
    HistorialComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecibosNominaPageRoutingModule
  ],
  providers: [
    InAppBrowser,
    InAppBrowser,
    FileOpener,
    FileTransfer,
    File,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RecibosNominaPageModule { }

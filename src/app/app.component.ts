import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { NavController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { Udid } from 'capacitor-udid';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  selectedPath: string;
  deviceInfo: any;

  constructor(
    private menu: MenuController,
    public util: UtilService,
    public navCtrl: NavController,

    private platform: Platform // Agregar Platform
  ) {
  
    this.platform.ready().then(() => {
      this.getDeviceInfo();
    });
  }

  closeMenu() {
    this.menu.close();
  }

 

  logout() {
    this.selectedPath = '';
    this.closeMenu();
    this.navCtrl.navigateRoot('login');
  }

  async getDeviceInfo() {
   
    /*IDENTIFICADOR UNICO */
    //const result = await Udid.getUdid();

   // alert(`Device UDID: ${result.value}`);
  }

  
}

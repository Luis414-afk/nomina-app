import { Component } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { NavController  } from '@ionic/angular';
@Component({
  selector: 'app-recibos-nomina',
  templateUrl: './recibos-nomina.component.html',
  styleUrls: ['./recibos-nomina.component.scss'],
})
export class RecibosNominaComponent {
  selected: any = 'historial';
  

  constructor(
    public util: UtilService,
    public navCtrl: NavController,
  ) {
  }

  changeSelected(name: any) {
    this.selected = name;
  }
  onBack() {
    this.util.onBack();
  }


  onPage(name: any) {
    this.navCtrl.navigateRoot(name);
   // this.util.navigateToPage(name);
  }
}

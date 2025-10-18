import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-detalle-popover',
  templateUrl: './detalle-popover.component.html',
  styleUrls: ['./detalle-popover.component.scss'],
})
export class DetallePopoverComponent {

  @Input() item?: any; // Recibimos los datos desde el popover

  constructor(private popoverCtrl: PopoverController) {}

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  getBadgeColor(estatus: number) {
    switch (estatus) {
      case 1:
        return 'success';
      case 2:
        return 'warning';
      case 3:
        return 'danger';
      default:
        return 'secondary';
    }
  }

}

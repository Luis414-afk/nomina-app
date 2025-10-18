import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-detalle-popover',
  templateUrl: './detalle-popover.component.html',
  styleUrls: ['./detalle-popover.component.scss'],
})
export class DetallePopoverComponent {

  constructor(private popoverController: PopoverController) {
  
  }

  dismiss() {
    this.popoverController.dismiss();
  }

}

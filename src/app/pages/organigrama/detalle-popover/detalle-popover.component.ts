import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ContactoService } from '../../../_servicesFunction/contacto.service'

@Component({
  selector: 'app-detalle-popover',
  templateUrl: './detalle-popover.component.html',
  styleUrls: ['./detalle-popover.component.scss'],
})
export class DetallePopoverComponent {

  @Input() details: any; // Recibimos los datos desde el popover

  constructor(private popoverCtrl: PopoverController, private contactoService: ContactoService) {}

  dismiss() {
    this.popoverCtrl.dismiss();
  }


  enviarCorreo() {
    this.contactoService.abrirCorreo("juan.perez@example.com");
  }

  llamarTelefono() {
    this.contactoService.abrirTelefono('+521234567890');
  }
}

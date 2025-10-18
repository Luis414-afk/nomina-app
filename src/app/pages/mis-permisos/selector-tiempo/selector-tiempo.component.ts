import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-selector-tiempo',
  templateUrl: './selector-tiempo.component.html',
  styleUrls: ['./selector-tiempo.component.scss'],
})
export class SelectorTiempoComponent  {
  selectedTime: string = '';

  constructor(private popoverController: PopoverController) {}

  confirm() {
    // Si no se seleccionó ninguna hora, usa la hora actual como valor predeterminado
    const selectedTime = this.selectedTime || new Date().toISOString(); // Hora actual si no hay selección
    this.popoverController.dismiss(selectedTime);
  }

  dismiss() {
    this.popoverController.dismiss();
  }
}

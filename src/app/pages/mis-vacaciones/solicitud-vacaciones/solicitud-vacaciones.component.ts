import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Platform, MenuController, ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { SelectorFechasComponent } from '../selector-fechas/selector-fechas.component';
import * as moment from 'moment'; // Importar moment
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-solicitud-vacaciones',
  templateUrl: './solicitud-vacaciones.component.html',
  styleUrls: ['./solicitud-vacaciones.component.scss'],
})
export class SolicitudVacacionComponent implements OnInit {
  selectedDates: { from: string; to: string } | string[] | null = null;
  diasSeleccionados: string = '';
  popover: any;
  totalDias:number=0;
  // Variable para almacenar la fecha y hora actual
  fechaHoraActual: string;

  constructor(
    public util: UtilService,
    private popoverController: PopoverController,
    private router: Router
  ) {}

  ngOnInit() {
    moment.locale('es');
    // Generar la fecha y hora actual al inicializar el componente
    this.fechaHoraActual = this.obtenerFechaHoraActual();
  }

  /**
   * Método para obtener la fecha y hora actual usando moment
   */
  obtenerFechaHoraActual(): string {
    return moment().format('MMMM Do YYYY'); // Formato: Nombre del Mes Díaº Año
  }

  async presentPopover() {
    // Cerrar cualquier popover existente antes de presentar uno nuevo
    if (this.popover) {
      await this.popover.dismiss();
    }

    this.popover = await this.popoverController.create({
      cssClass: 'full-screen-popover',
      component: SelectorFechasComponent,
      componentProps: {
        selectedDates: this.selectedDates, // Pasa las fechas seleccionadas al popover
        diasDisponibles: 5,
      },
      translucent: true,
    });

    // Manejar el resultado del popover
    this.popover.onDidDismiss().then((data: any) => {
      if (data && data.data) {
        this.selectedDates = <[]>data.data.data;
        this.totalDias = this.selectedDates.length;
        this.diasSeleccionados = this.selectedDates.join(', ');
      }
      this.popover = null;
    });

    await this.popover.present();
  }


   async enviarSolicitud() {
  
      setTimeout(() => {
        Swal.fire({
          title: '¡Operación exitosa!',
          text: 'Tu solicitud fue enviada.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          heightAuto: false,
          customClass: {
            confirmButton: 'custom-primary'
          },
          buttonsStyling: false
        }).then(() => {
          this.router.navigate(['/tabs/menu-general/mis-vacaciones']);
        });
        
        
      }, 10);
    }
}
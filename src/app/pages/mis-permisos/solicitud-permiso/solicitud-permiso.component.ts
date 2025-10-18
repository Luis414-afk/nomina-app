import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Platform, MenuController, ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { SelectorFechasComponent } from '../selector-fechas/selector-fechas.component';
import * as moment from 'moment'; // Importar moment
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SelectorTiempoComponent } from '../selector-tiempo/selector-tiempo.component'
@Component({
  selector: 'app-solicitud-permiso',
  templateUrl: './solicitud-permiso.component.html',
  styleUrls: ['./solicitud-permiso.component.scss'],
})
export class SolicitudPermisoComponent implements OnInit {
  selectedDates: { from: string; to: string } | string[] | null = null;
  diasSeleccionados: string = '';
  listMotivos = [
    { id: 1, value: 'Llegar tarde' },
    { id: 2, value: 'Salir temprano' },
    { id: 3, value: 'Faltar' }
  ];
  selectedOption: number | null = null;
  listSueldo = [
    { valueId: 1, value: 'Goce de sueldo' },
    { valueId: 2, value: 'Tiempo por tiempo' },
    { valueId: 3, value: 'Sin sueldo' }
  ];
  selectedOptionSueldo: number | null = null;

  popover: any;
  isPopoverOpen: boolean = false;


  fechaHoraActual: string;
  horaEntrada: string = ''; // Hora de entrada
  horaSalida: string = ''; // Hora de salida
  horaRegreso: string = ''; // Hora de regreso
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
        this.selectedDates = [data.data.data];
       
        this.diasSeleccionados = data.data.data;
      }
      this.popover = null;
    });

    await this.popover.present();
  }


  async openPopover(ev: Event, type: string) {
    // Verifica si ya hay un popover abierto
    if (this.isPopoverOpen) {
      console.warn('Ya hay un popover abierto. No se abrirá otro.');
      return;
    }

    try {
      this.isPopoverOpen = true; // Marca el popover como abierto

      const popover = await this.popoverController.create({
        component: SelectorTiempoComponent,
        event: ev,
        alignment: 'center',
        translucent: true,
      });

      // Cuando el popover se cierre, obtén la hora seleccionada
      popover.onDidDismiss().then((data) => {
        this.isPopoverOpen = false; // Marca el popover como cerrado
        
        if (data && data.data) {
          const formattedTime = moment(data.data).format('HH:mm'); // Formatea la hora
          if (type === 'entrada') {
            this.horaEntrada = formattedTime;
          } else if (type === 'salida') {
            this.horaSalida = formattedTime;
          } else if (type === 'regreso') {
            this.horaRegreso = formattedTime;
          }
        }
      });

      return await popover.present();
    } catch (error) {
      console.error('Error al abrir el popover:', error);
      this.isPopoverOpen = false; // Asegúrate de resetear el estado en caso de error
    }
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
          this.router.navigate(['/tabs/menu-general/mis-permisos']);
        });
        
        
      }, 10);
    }
}
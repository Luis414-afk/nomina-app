import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { PopoverController } from '@ionic/angular';
import { DetallePopoverComponent } from './detalle-popover/detalle-popover.component'
import * as moment from 'moment';
import 'moment/locale/es';
@Component({
  selector: 'app-mis-permisos',
  templateUrl: './mis-permisos.component.html',
  styleUrls: ['./mis-permisos.component.scss'],
})
export class MisPermisosComponent  implements OnInit {
  userList  = [
    {
      tipo: 'Llegar tarde',
      estatus: 1,
      estatusName: "Aprobado",
      fechaCreacion: '13/10/2025 08:30:00',
      fechasSolicitadas: '16/10/2025',
      diasSolicitados: 1
    },
    {
      tipo: 'Salir temprano',
      estatus: 2,
      estatusName: "Rechazado",
      fechaCreacion: '11/10/2025 14:45:00',
      fechasSolicitadas: '14/10/2025',
      diasSolicitados: 1
    },
    {
      tipo: 'Faltar',
      estatus: 3,
      estatusName: "Pendiente",
      fechaCreacion: '12/10/2025 09:15:00',
      fechasSolicitadas: '15/10/2025 - 16/10/2025',
      diasSolicitados: 2
    },
    {
      tipo: 'Llegar tarde',
      estatus: 3,
      estatusName: "Pendiente",
      fechaCreacion: '14/10/2025 07:50:00',
      fechasSolicitadas: '17/10/2025',
      diasSolicitados: 1
    },
    {
      tipo: 'Faltar',
      estatus: 1,
      estatusName: "Aprobado",
      fechaCreacion: '10/10/2025 10:20:00',
      fechasSolicitadas: '12/10/2025 - 13/10/2025',
      diasSolicitados: 2
    },
    {
      tipo: 'Salir temprano',
      estatus: 3,
      estatusName: "Pendiente",
      fechaCreacion: '09/10/2025 16:05:00',
      fechasSolicitadas: '11/10/2025',
      diasSolicitados: 1
    },
    {
      tipo: 'Llegar tarde',
      estatus: 2,
      estatusName: "Rechazado",
      fechaCreacion: '15/10/2025 08:10:00',
      fechasSolicitadas: '18/10/2025',
      diasSolicitados: 1
    },
    {
      tipo: 'Faltar',
      estatus: 2,
      estatusName: "Rechazado",
      fechaCreacion: '08/10/2025 12:30:00',
      fechasSolicitadas: '09/10/2025 - 10/10/2025',
      diasSolicitados: 2
    },
    {
      tipo: 'Salir temprano',
      estatus: 1,
      estatusName: "Aprobado",
      fechaCreacion: '07/10/2025 15:40:00',
      fechasSolicitadas: '08/10/2025',
      diasSolicitados: 1
    },
    {
      tipo: 'Llegar tarde',
      estatus: 1,
      estatusName: "Aprobado",
      fechaCreacion: '16/10/2025 08:25:00',
      fechasSolicitadas: '19/10/2025',
      diasSolicitados: 1
    }
  ];
  
  
  constructor(
    public util: UtilService,
    private popoverController: PopoverController
  ) {}

  
  ngOnInit() {}


  
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

  getHora(fechaCreacion: string): string {
    return moment(fechaCreacion, 'DD/MM/YYYY HH:mm:ss').format('HH:mm:ss'); 
  }
  
  getFecha(fechaCreacion: string): string {
    return moment(fechaCreacion, 'DD/MM/YYYY HH:mm:ss').format('MMM DD, YYYY'); 
  }
  

  onPage(name: any) {
    this.util.navigateToPage(name);
  }


    async openDetailPopover(item:any) {
       
        
        const popover = await this.popoverController.create({
          component: DetallePopoverComponent,
          alignment: 'center', // Centra el popover
          cssClass: 'full-screen-popover',
          componentProps: {
            item: item // ✅ Pasamos como "details" para accederlo en el popover
          }
        });
    
        //console.log(object)
      
        return await popover.present();
    }

}

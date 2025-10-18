import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { PopoverController } from '@ionic/angular';
import { DetallePopoverComponent } from './detalle-popover/detalle-popover.component'

@Component({
  selector: 'app-mis-vacaciones',
  templateUrl: './mis-vacaciones.component.html',
  styleUrls: ['./mis-vacaciones.component.scss'],
})
export class MisVacionesComponent  implements OnInit {
  userList = [
    {
  
      estatus: 1,
      estatusName: "Aprobado",
      hora: '08:30:00',
      fecha: 'Oct 14, 2025',
      fechaCreacion: '10/10/2025',
      fechasSolicitadas: '14/10/2025 - 18/10/2025',
      diasSolicitados: 5
    },
    {
    
      estatus: 2,
      estatusName: "Rechazado",
      hora: '17:00:00',
      fecha: 'Oct 14, 2025',
      fechaCreacion: '11/10/2025',
      fechasSolicitadas: '20/10/2025 - 22/10/2025',
      diasSolicitados: 3
    },
    {

      estatus: 3,
      estatusName: "Pendiente",
      hora: '09:15:00',
      fecha: 'Oct 15, 2025',
      fechaCreacion: '12/10/2025',
      fechasSolicitadas: '25/10/2025 - 30/10/2025',
      diasSolicitados: 6
    },
    {
  
      estatus: 1,
      estatusName: "Aprobado",
      hora: '16:45:00',
      fecha: 'Oct 15, 2025',
      fechaCreacion: '13/10/2025',
      fechasSolicitadas: '01/11/2025 - 03/11/2025',
      diasSolicitados: 3
    },
    {
   
      estatus: 2,
      estatusName: "Rechazado",
      hora: '10:00:00',
      fecha: 'Oct 16, 2025',
      fechaCreacion: '14/10/2025',
      fechasSolicitadas: '05/11/2025 - 08/11/2025',
      diasSolicitados: 4
    },
    {
   
      estatus: 3,
      estatusName: "Pendiente",
      hora: '15:30:00',
      fecha: 'Oct 16, 2025',
      fechaCreacion: '15/10/2025',
      fechasSolicitadas: '10/11/2025 - 12/11/2025',
      diasSolicitados: 3
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

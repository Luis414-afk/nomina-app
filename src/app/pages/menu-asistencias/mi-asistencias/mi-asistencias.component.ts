import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import {  Platform ,MenuController,ModalController  } from '@ionic/angular';
import { DetalleAsistenciasComponent } from '../modals/detalle-asistencias/detalle-asistencias.component';
@Component({
  selector: 'app-mi-asistencias',
  templateUrl: './mi-asistencias.component.html',
  styleUrls: ['./mi-asistencias.component.scss'],
})
export class MiAsistenciasComponent  implements OnInit {


  pedido = {
    id: 123,
    fecha: '2024-05-20T10:00:00Z',
    estado: 'Entregado',
    cantidadTotal: 2,
    total: 899.90,
    productos: [
      { sku: 'PROD-001', descripcion: 'Camiseta algodón', cantidad: 2, precio: 299.95 },
      { sku: 'PROD-001', descripcion: 'Camiseta algodón', cantidad: 2, precio: 299.95 },
      { sku: 'PROD-001', descripcion: 'Camiseta algodón', cantidad: 2, precio: 299.95 },
      { sku: 'PROD-001', descripcion: 'Camiseta algodón', cantidad: 2, precio: 299.95 },
      { sku: 'PROD-001', descripcion: 'Camiseta algodón', cantidad: 2, precio: 299.95 },
      // ...
    ]
  }

  constructor(
    public util: UtilService,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {}

  async openModal(){
    const modalMapa = await this.modalCtrl.create({
      component: DetalleAsistenciasComponent,
      breakpoints: [0, 0.9, 1.0],
      initialBreakpoint: 1.0,
      backdropDismiss: true, // <-- enable backdrop dismiss
      componentProps: {
       
      }
    });

    /*EJECUTA FUNCION CUANDO SE CIERRA EL FILTRO DE ASISTENCIAS*/
    modalMapa.onDidDismiss()
    .then((respuesta_modal:any) => {
   
    }).finally(()=>{
     
    })

    modalMapa.present();
 
  }

}

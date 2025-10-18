import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { NavigationExtras } from '@angular/router';


export interface MenuGral {
  nombre:string,
  informacion:string,
  link:string,
  imagen:string,
  list:string,
}

@Component({
  selector: 'app-menu-general',
  templateUrl: './menu-general.component.html',
  styleUrls: ['./menu-general.component.scss'],
})
export class MenuGeneralComponent  implements OnInit {
  coursesList: any[] = [];

  menuGralItems: MenuGral[] = [
    {
      nombre: 'Nómina',
      informacion: 'Consulta y gestiona tus recibos de nómina fácilmente.',
      link: '/tabs/menu-general/recibos-nomina',  // La ruta a la cual redirigir
      imagen: 'assets/images/menu/nomina.jpg',  // Ruta a la imagen
      list:'Recibos Nomina | Dashboard'
    },
    {
      nombre: 'Control de Asistencia',
      informacion: 'Revisa tus registros de asistencia y permisos.',
      link: '/tabs/menu-general/menu-asistencias',
      imagen: 'assets/images/menu/asistencia.jpg',
      list:'Historial Asisetcnia | Checador Digital | Dashboard'
    },
    {
      nombre: 'Calendario Empresarial',
      informacion: 'Consulta el calendario de eventos y actividades.',
      link: '/tabs/menu-general/calendario',
      imagen: 'assets/images/menu/calendario.jpg',
      list:'Calendario de eventos internos'
    }
  ];

  constructor(
    public util: UtilService,
    
  ) {
  }

  ngOnInit() {
    
  }

  

  

  onPage(name: any) {
    this.util.navigateToPage(name);
  }
}

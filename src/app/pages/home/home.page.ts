/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { NavigationExtras } from '@angular/router';
import { register } from 'swiper/element';
import Swiper from 'swiper';
import { MenuController } from '@ionic/angular';
register();


export interface NoticiaDto{
  titulo:string,
  cuerpo:string,
  pagina:number,
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild("swiper") swiper?: ElementRef<{ swiper: Swiper }>



 

  noticias: NoticiaDto[] = [
    {
      titulo: "¡Hoy Salimos a las 6:30 PM!",
      cuerpo: "Con motivo de la celebración de nuestro aniversario, hoy se permitirá la salida a las 6:30 PM. ¡Esperamos que disfruten del evento de esta noche y gracias por ser parte de nuestra familia!",
      pagina: 1,
    },
    {
      titulo: "Actualización de Documentos de Seguridad",
      cuerpo: "Recordamos a todos los empleados que es necesario actualizar sus documentos de seguridad laboral antes del 30 de julio. Por favor, diríjanse al departamento de recursos humanos para verificar sus documentos.",
      pagina: 1,
    },
    {
      titulo: "Nuevo Protocolo de Limpieza",
      cuerpo: "A partir del próximo lunes, se implementará un nuevo protocolo de limpieza y desinfección. Les pedimos a todos los empleados que colaboren con estas medidas para garantizar un ambiente de trabajo seguro y saludable.",
      pagina: 2,
    },
    {
      titulo: "Actualización de Política de Trabajo Remoto",
      cuerpo: "Nos complace anunciar que a partir del próximo mes, se permitirá el trabajo remoto los viernes. Por favor, coordinen con sus supervisores para planificar sus tareas y garantizar que todas las responsabilidades estén cubiertas.",
      pagina: 2,
    },
    {
      titulo: "Celebración de Cumpleaños del Mes",
      cuerpo: "Este viernes celebraremos los cumpleaños de nuestros colegas nacidos en julio. ¡Únanse a nosotros en la sala de conferencias a las 3:00 PM para disfrutar de pastel y juegos!",
      pagina: 3,
    },
    {
      titulo: "Felicidades a Nuestro Empleado del Mes",
      cuerpo: "Nos enorgullece anunciar que María López ha sido nombrada Empleada del Mes por su dedicación y esfuerzo excepcionales. ¡Gracias, María, por tu contribución a nuestro equipo!",
      pagina: 3,
    },
    {
      titulo: "Cambios en el Horario de Almuerzo",
      cuerpo: "A partir de la próxima semana, el horario de almuerzo será de 12:00 PM a 1:00 PM. Agradecemos su cooperación para ajustarse a este nuevo horario.",
      pagina: 4,
    },
    {
      titulo: "Mantenimiento Programado de Sistemas",
      cuerpo: "Habrá un mantenimiento programado de nuestros sistemas el sábado 29 de julio, de 9:00 AM a 12:00 PM. Durante este tiempo, algunas aplicaciones podrían estar temporalmente no disponibles.",
      pagina: 4,
    },
    {
      titulo: "Capacitación de Seguridad Obligatoria",
      cuerpo: "Todos los empleados deben asistir a la capacitación de seguridad el miércoles 26 de julio a las 10:00 AM en la sala de conferencias. La asistencia es obligatoria y se proporcionará almuerzo.",
      pagina: 5,
    },
    {
      titulo: "Convocatoria a Reunión General",
      cuerpo: "Invitamos a todos los empleados a la reunión general de la empresa que se llevará a cabo el lunes 31 de julio a las 4:00 PM. Se discutirán importantes actualizaciones de la empresa y se responderán preguntas.",
      pagina: 5,
    },
    {
      titulo: "¡Nueva Cafetería en el Piso 2!",
      cuerpo: "Nos complace anunciar la apertura de una nueva cafetería en el piso 2. ¡Visítennos para disfrutar de un delicioso café y bocadillos frescos!",
      pagina: 6,
    },
    {
      titulo: "Concurso de Ideas Innovadoras",
      cuerpo: "Participe en nuestro Concurso de Ideas Innovadoras y tenga la oportunidad de ver su idea convertida en realidad. ¡El ganador recibirá un premio sorpresa!",
      pagina: 6,
    },
    {
      titulo: "Limpieza de Oficina este Viernes",
      cuerpo: "Este viernes llevaremos a cabo una limpieza profunda en las oficinas. Por favor, guarde sus pertenencias personales para evitar inconvenientes.",
      pagina: 7,
    },
    {
      titulo: "Nuevo Programa de Beneficios para Empleados",
      cuerpo: "Nos complace presentar un nuevo programa de beneficios para empleados que incluye descuentos en gimnasios locales y membresías de bienestar.",
      pagina: 7,
    },
    {
      titulo: "Fiesta de Fin de Año Confirmada",
      cuerpo: "La fiesta de fin de año se celebrará el 15 de diciembre en el Gran Salón del Hotel Luxor. ¡No olviden confirmar su asistencia!",
      pagina: 8,
    },
  ];
  
  index: any = 0;
  activeCate: any = '';
  courseContent: any = '';

  coursesList: any[] = [];
  constructor(
    public util: UtilService,
    private menuCtrl: MenuController
  ) {
    this.activeCate = this.util.categories[2];
    this.courseContent = this.util.categories[0];
    this.changeCourse();
  }

  changeCourse() {
    const index = Math.floor(Math.random() * ((this.util.coursesList.length - 1) - 0 + 1) + 0);
    console.log('index=', index);
    console.log(this.util.coursesList.length);
    this.coursesList = this.util.coursesList[index].list;
    console.log(this.coursesList);
  }

  ngOnInit() {
  }

  onSearch() {
    this.util.navigateToPage('/search');
  }

  slideChanged(event: any) {
    this.index = this.swiper?.nativeElement.swiper.activeIndex;
  }

  changeActiveCate(name: any) {
    this.activeCate = name;
  }

  changeCourseContent(name: any) {
    this.courseContent = name;
    this.changeCourse();
  }

  onPage(name: any) {
    this.util.navigateToPage(name);
  }

  onCourseDetails(name: any, image: any, type: any) {
    const param: NavigationExtras = {
      queryParams: {
        name: name,
        image: image,
        type: type
      }
    };
    this.util.navigateToPage('/tabs/home/course-details', param);
  }

  onMentorDetails(name: any, image: any) {
    const param: NavigationExtras = {
      queryParams: {
        name: name,
        image: image
      }
    };
    this.util.navigateToPage('mentor-details', param);
  }




 
  countText(fullText:string) {
    const longitud:number = 50;
    return fullText.length > longitud ? fullText.slice(0, longitud) + '...' : fullText;
  }
}

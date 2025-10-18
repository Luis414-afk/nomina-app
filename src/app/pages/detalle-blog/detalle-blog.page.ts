/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

export interface BlogPost {
  titulo: string;
  contenido: string;
  fecha: Date;
  autor: string;
  imagenUrl: string;
}

@Component({
  selector: 'app-detalle-blog',
  templateUrl: './detalle-blog.page.html',
  styleUrls: ['./detalle-blog.page.scss'],
})
export class DetalleBlogPage implements OnInit {

  blogContent: string = `
    <h2 style="color:#3f51b5;">Cómo mejorar tu productividad en el trabajo</h2>
    <p>
      La productividad no se trata solo de trabajar más, sino de trabajar de forma más <strong>inteligente</strong>.
      A continuación te comparto algunos consejos que puedes aplicar desde hoy.
    </p>

    <img src="https://picsum.photos/800/400" 
         alt="Productividad en el trabajo" 
         style="width:100%; border-radius:12px; margin:15px 0;"/>

    <h3>1. Establece prioridades diarias</h3>
    <p>
      Empieza el día identificando las tareas más importantes y concéntrate en completarlas antes que las demás.
    </p>

    <h3>2. Evita distracciones</h3>
    <ul>
      <li>Silencia notificaciones innecesarias.</li>
      <li>Reserva bloques de tiempo para concentrarte.</li>
      <li>Haz pequeñas pausas entre tareas largas.</li>
    </ul>

    <blockquote style="border-left:4px solid #3f51b5; padding-left:10px; color:#555;">
      “La clave del éxito está en enfocarte en lo que realmente importa.”
    </blockquote>

    <p>
      Recuerda que la consistencia es más poderosa que la intensidad. Dedica un poco de tiempo cada día a mejorar tus hábitos de trabajo.
    </p>
  `;
  
  name: any = '';
  image: any = '';
  type: any = '';

  selectedSegments: any = 'about';
  constructor(
    public util: UtilService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      this.name = data.name;
      this.image = data.image;
      this.type = data.type;
    });
  }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }


}

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContactoService {
  constructor(private iab: InAppBrowser) {}

  abrirCorreo(correo:string) {
    const asunto = encodeURIComponent('Consulta de asistencia');
    const cuerpo = encodeURIComponent('Hola, quisiera más información sobre...');

    const mailto = `mailto:${correo}?subject=${asunto}&body=${cuerpo}`;
    this.iab.create(mailto, '_self', 'location=yes');
  }

  abrirTelefono(celular:string) {
    const tel = `tel:${celular}`;
    this.iab.create(tel, '_self', 'location=yes');
  }
  
}

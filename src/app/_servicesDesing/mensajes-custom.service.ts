import { Injectable } from '@angular/core';
import {
  NavController, AlertController, MenuController, ToastController,LoadingController,
  ModalController, ActionSheetController, PopoverController, Platform, IonRouterOutlet
} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class MensajesCustomService {

  constructor(
    public alertController: AlertController,
    public modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
  ) { }



  

  async alert_mensaje(titulo:string, subtitulo:string, mensaje:string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert_general',
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['ACEPTAR']
    });

    await alert.present();
    
  }

  async alert_mensaje_buttons(titulo:string, subtitulo:string, mensaje:string, buttons:any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert_general',
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons:buttons
    });

    await alert.present();
  }

  async toast_mensaje(mensaje:string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 4000
    });
    toast.present();
  }

  toast_mensaje_salir() {
    this.toastCtrl.create({
      message: 'Presiona de nuevo para salir',
      duration: 3000,
      position: 'bottom'
    }).then(toast => toast.present());
  }

  async toast_mensaje_notifications(title:string,mensaje:string) {
    const toast = await this.toastCtrl.create({
      header:   title,
      message:  mensaje,
      duration: 7500,
      position: 'bottom',
      icon:"notifications-circle"
    });

    await toast.present();
  }

  
  async loading_show_spinner(mensaje:string){
    const loading = await this.loadingCtrl.create({
      message: mensaje
    });

    await loading.present();

    return loading;
  }



 


}

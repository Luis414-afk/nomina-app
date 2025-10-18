import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-credencial-digital',
  templateUrl: './credencial-digital.component.html',
  styleUrls: ['./credencial-digital.component.scss'],
})
export class CredencialDigitalComponent  implements OnInit {
  public qrWidth?: number;
  qrData: string = 'https://www.example.com';

  selectedSegment: string = 'info'; // El segmento seleccionado por defecto
  constructor(private platform: Platform, public util: UtilService,) { }

  ngOnInit() {
    this.calculateQrWidth();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  calculateQrWidth() {
    const screenWidth = this.platform.width();
    this.qrWidth = screenWidth * 0.75;
  }


  onBack() {
    this.util.onBack();
  }
}

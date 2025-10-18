import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera as CameraPipe } from '@mediapipe/camera_utils';
import { FaceMesh } from '@mediapipe/face_mesh';
import { ControlGestosService } from '../mi-checador/services/control-gestos.service';
import * as moment from 'moment';

import { MensajesCustomService } from '../../../_servicesDesing/mensajes-custom.service';
import { PermisosGeneralesService } from '../../../_servicesFunction/permisos-generales.service';
import Swal from 'sweetalert2';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';

export interface TipoChecada {
  id: number;
  nombre: string;
  horario: string;
}

@Component({
  selector: 'app-mi-checador',
  templateUrl: './mi-checador.component.html',
  styleUrls: ['./mi-checador.component.scss'],
})
export class MiChecadorComponent implements OnInit {
  /* ELEMENTOS DE LA CAMARA */
  @ViewChild('input_video', { static: false }) input_video?: ElementRef | null;
  @ViewChild('output_canvas', { static: false }) output_canvas?: ElementRef | null;

  WIDTH = 220;
  HEIGHT = 280;
  videoElement: any;
  canvasElement: any;
  canvasCtx: any;
  isCenterFace: boolean = false;
  valueFigure: number = 200;
  showEvento: string = 'ESPERANDO A TOMAR ASISTENCIA';
  currentTime: string = '';
  currentDate: string = '';
  private intervalId: any;
  private mensajeVisible: boolean = false;
  cameraVideo: any;
  camara: boolean = false;
  geolocation: boolean = false;
  scanningActive: boolean = false;
  eventos = [
    { id: 1, nombre: 'ojos cerrados' },     // ya existente
    { id: 2, nombre: 'sonrisa' },           // ya existente
    { id: 3, nombre: 'abrir boca' },        // ya existente
    { id: 4, nombre: 'levantar cejas' },    // nuevo
    { id: 5, nombre: 'guiñar ojo' },        // nuevo
    { id: 6, nombre: 'sacar lengua' },      // nuevo
    { id: 7, nombre: 'levantar cabeza' }    // nuevo
  ];
  
  tiposChecada: any;
  eventoSeleccionadoChecada: TipoChecada = { id: 0, nombre: '', horario: '' };
  eventoSeleccionado: any;
  showFiguraCara: boolean = false;
  imageDataUrl: string = '';
  count: number = 0;

  constructor(
    public controlEventosService: ControlGestosService,
    private platform: Platform,
    public util: UtilService,
    public permisosGeneralesService: PermisosGeneralesService,
    private mensajesCustomService: MensajesCustomService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.WIDTH = this.platform.width() - 65;
    this.HEIGHT = this.platform.height() - 500;

    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
    this.displayButtonsPermissionPerEnable();
  }

  async ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.cameraVideo) {
      this.cameraVideo.stop();
      this.cameraVideo = null;
    }
    if (this.canvasCtx) {
      this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
      this.canvasCtx = null;
    }
    if (this.videoElement) {
      this.videoElement.srcObject = null;
      this.videoElement = null;
    }
    this.canvasElement = null;
    this.input_video = null;
    this.output_canvas = null;
    await this.controlEventosService.restoreBrightness();
  }

  updateTime() {
    this.currentTime = moment().format('HH:mm:ss');
    this.currentDate = moment().format('DD MMM YYYY');
  }

  // ✅ Llama al servicio optimizado
  displayButtonsPermissionPerEnable() {
    this.permisosGeneralesService.getPermissionsStatus().then((result) => {
      this.camara = result.camera;
      this.geolocation = result.geolocation;
    });
  }

  // ✅ Simplificado: usa servicio optimizado
  async enablePermissionUbicacion() {
    await this.permisosGeneralesService.solicitarPermiso('geolocation');
    this.displayButtonsPermissionPerEnable();
  }

  // ✅ Simplificado: usa servicio optimizado
  async enablePermissionCamara() {
    await this.permisosGeneralesService.solicitarPermiso('camera');
    this.displayButtonsPermissionPerEnable();
  }

  ionViewWillLeave() {
    this.ngOnDestroy();
    this.scanningActive = true;
    this.showEvento = 'ESPERANDO A TOMAR ASISTENCIA';
    this.showFiguraCara = false;
  }

  // -------------------------
  // FACE MESH Y EVENTOS
  // -------------------------
  loadPropiedadesFACEID2() {
    this.imageDataUrl = '';
    this.eventoSeleccionado = this.seleccionarEventoAleatorio();
    this.scanningActive = false;
    this.showFiguraCara = true;
    this.isCenterFace = false;

    setTimeout(() => {
      this.loadPropiedadesFACEID();
    }, 10);
  }

  async loadPropiedadesFACEID() {
    this.videoElement = document.getElementsByClassName('input_video')[0];
    this.canvasElement = document.getElementById('output_canvas');
    this.canvasCtx = this.canvasElement.getContext('2d');

    const faceMesh = new FaceMesh({locateFile: (file) => {
      return `assets/facemesh/${file}`;
    }});

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    await this.controlEventosService.setBrightnessMax();
    faceMesh.onResults(this.onResults_face.bind(this));

    this.cameraVideo = new CameraPipe(this.videoElement, {
      onFrame: async () => {
        await faceMesh.send({ image: this.videoElement });
      },
      width: this.WIDTH,
      height: this.HEIGHT,
    });

    this.cameraVideo.start();
  }

  seleccionarEventoAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * this.eventos.length);
    return this.eventos[indiceAleatorio];
  }



  onResults_face(results: any) {
    if (this.scanningActive) return;

    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.canvasCtx.drawImage(results.image, 0, 0, this.canvasElement.width, this.canvasElement.height);

    if (results.multiFaceLandmarks.length > 0) {
      if (this.controlEventosService.checkCenterFace(results)) {
        if (this.checkFaceWithEyesCenter(results)) {
          this.isCenterFace = false;
          this.showEvento = 'TU CARA MIRANDO HACIA ENFRENTE';
        } else {
          this.isCenterFace = true;
          const evento = this.eventoSeleccionado.nombre;
          const service = this.controlEventosService;

          // Detectar evento
          let eventoDetectado = false;

          if (evento === 'ojos cerrados' && service.parpadeoSimultaneo(results)) eventoDetectado = true;
          if (evento === 'sonrisa' && service.detectSmile(results)) eventoDetectado = true;
          if (evento === 'abrir boca' && service.detectOpenBoca(results)) eventoDetectado = true;
          if (evento === 'levantar cejas' && service.detectRaiseEyebrows(results)) eventoDetectado = true;
          if (evento === 'guiñar ojo' && service.detectWink(results)) eventoDetectado = true;
          if (evento === 'sacar lengua' && service.detectTongueOut(results)) eventoDetectado = true;
          if (evento === 'levantar cabeza' && service.detectHeadLift(results)) eventoDetectado = true;

          // Mostrar mensaje del evento
          if (eventoDetectado && !this.mensajeVisible) {
            this.mensajeVisible = true;
            this.showEvento = `¡${evento.toUpperCase()} DETECTADO!`;
            
            // Esperar antes de finalizar
            setTimeout(() => {
              this.finalizarEscaneo(results.image);
              this.mensajeVisible = false;
            }, 2000); // 2 segundos para leer
          } else if (!eventoDetectado) {
            this.showEvento = evento.toUpperCase();
          }
        }
      } else {
        this.isCenterFace = false;
        this.showEvento = 'CENTRA TU CARA FRENTE LA CAMARA';
      }
      this.canvasCtx.restore();
    } else {
      this.showEvento = 'TU CARA DENTRO DEL OVALO';
    }
  }


  checkFaceWithEyesCenter(results: any) {
    const umbralOjos = 0.52;
    const right = this.controlEventosService.getEyeVisibility(results, 'right') || 0;
    const left = this.controlEventosService.getEyeVisibility(results, 'left') || 0;
    return right > umbralOjos || left > umbralOjos;
  }

  async finalizarEscaneo(image: any) {
    await this.controlEventosService.restoreBrightness();
    this.scanningActive = true;
    this.showEvento = 'ESCANEO COMPLETADO';
    this.cameraVideo.stop();
    this.showFiguraCara = false;
    await this.captureImage(image);
  }

  async captureImage(image: any) {
    this.imageDataUrl = this.canvasElement.toDataURL('image/png');

    const coords = await this.permisosGeneralesService.obtenerCoordenadas();
    const latitude = coords?.lat || 0;
    const longitude = coords?.lng || 0;

    this.canvasCtx.drawImage(image, 0, 0, this.canvasElement.width, this.canvasElement.height);
    this.canvasCtx.fillStyle = 'white';
    this.canvasCtx.font = '10px Arial';
    this.canvasCtx.fillText(`Latitud: ${latitude.toFixed(6)}`, 10, 20);
    this.canvasCtx.fillText(`Longitud: ${longitude.toFixed(6)}`, 10, 40);

    this.imageDataUrl = this.canvasElement.toDataURL('image/png');
    const coordenadas = `${latitude}, ${longitude}`;
    this.checarAsistencia(coordenadas);
  }

  async checarAsistencia(coordenadas: string) {
    this.ngOnDestroy();
    const horaRegistro = moment();
    const horaEsperada = moment(this.eventoSeleccionadoChecada.horario, 'HH:mm');
    const diferenciaHora = horaRegistro.diff(horaEsperada, 'minutes');

    setTimeout(() => {
      Swal.fire({
        title: '¡Operación exitosa!',
        text: 'Tu asistencia fue enviada.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        heightAuto: false,
        customClass: {
          confirmButton: 'custom-primary'
        },
        buttonsStyling: false
      }).then(() => {
        this.router.navigate(['/tabs/menu-general/menu-asistencias/historial']);
      });
      
      
    }, 10);
  }
}

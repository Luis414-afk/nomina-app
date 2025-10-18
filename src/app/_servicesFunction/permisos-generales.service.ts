import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { NativeSettings, AndroidSettings, IOSSettings } from 'capacitor-native-settings';
import { MensajesCustomService } from '../_servicesDesing/mensajes-custom.service';

export type TipoPermiso = 'camera' | 'geolocation' | 'notifications' | 'storage';

@Injectable({
  providedIn: 'root'
})
export class PermisosGeneralesService {

  constructor(private mensajesCustomService: MensajesCustomService) {}

  /**
   * ✅ Obtiene el estado actual de los permisos
   * - En web devuelve ambos como habilitados (sin validar)
   */
  async getPermissionsStatus() {
    const permisos = {
      camera: false,
      geolocation: false
    };

    // 🚫 En web no validamos permisos
    if (Capacitor.getPlatform() === 'web') {
      return { camera: true, geolocation: true };
    }

    try {
      const cameraPerm = await Camera.checkPermissions();
      permisos.camera = cameraPerm.camera === 'granted';

      const geoPerm = await Geolocation.checkPermissions();
      permisos.geolocation = geoPerm.coarseLocation === 'granted';
    } catch (error) {
      console.warn('Error al verificar permisos:', error);
    }

    return permisos;
  }

  /**
   * ✅ Solicita o habilita un permiso específico
   * - En web no hace nada (evita alertas)
   */
  async solicitarPermiso(tipo: TipoPermiso) {
    const plataforma = Capacitor.getPlatform();

    // 🚫 En web ignoramos todas las solicitudes de permisos
    if (plataforma === 'web') {
      console.info(`Permiso '${tipo}' omitido en entorno web.`);
      return Promise.resolve(true);
    }

    switch (tipo) {
      case 'camera':
        await this.handleCameraPermission();
        break;

      case 'geolocation':
        await this.handleGeolocationPermission();
        break;

      case 'notifications':
        await this.handleGenericPermission(2, 'Notificaciones');
        break;

      case 'storage':
        await this.handleGenericPermission(1, 'Almacenamiento');
        break;

      default:
        console.warn(`Tipo de permiso desconocido: ${tipo}`);
        break;
    }
  }

  // -------------------------------------------------------------------
  // 🔸 MÉTODOS PRIVADOS DE GESTIÓN DE PERMISOS
  // -------------------------------------------------------------------

  /** 🎥 Cámara */
  private async handleCameraPermission() {
    const permissions = await Camera.checkPermissions();

    if (permissions.camera === 'prompt' || permissions.camera === 'prompt-with-rationale') {
      await Camera.requestPermissions();
    } else if (permissions.camera === 'denied') {
      this.openSettingsDevice(1);
    }
  }

  /** 📍 Geolocalización */
  private async handleGeolocationPermission() {
    const permisoUbicacion = await Geolocation.checkPermissions();

    if (permisoUbicacion.coarseLocation === 'prompt' || permisoUbicacion.coarseLocation === 'prompt-with-rationale') {
      await Geolocation.requestPermissions();
    } else if (permisoUbicacion.coarseLocation === 'denied') {
      this.openSettingsDevice(3);
    }
  }

  /** 🔔 Notificaciones / Almacenamiento */
  private async handleGenericPermission(pluginNum: number, nombre: string) {
    this.mensajesCustomService.alert_mensaje(
      "Permiso requerido",
      "",
      `Para continuar, habilita el permiso de ${nombre} en la configuración del dispositivo.`
    );
    this.openSettingsDevice(pluginNum);
  }

  /** ⚙️ Redirección a configuración del dispositivo */
  private openSettingsDevice(pluginNum: number) {
    const platform = Capacitor.getPlatform();

    if (platform === 'ios') {
      const iosSettingsMap: Record<number, IOSSettings> = {
        1: IOSSettings.App,
        2: IOSSettings.Notifications,
        3: IOSSettings.LocationServices
      };
      NativeSettings.openIOS({ option: iosSettingsMap[pluginNum] });
    } else if (platform === 'android') {
      const androidSettingsMap: Record<number, AndroidSettings> = {
        1: AndroidSettings.ApplicationDetails,
        2: AndroidSettings.AppNotification,
        3: AndroidSettings.Location
      };
      NativeSettings.openAndroid({ option: androidSettingsMap[pluginNum] });
    }
  }

  // -------------------------------------------------------------------
  // 📡 GEOLOCALIZACIÓN GENÉRICA
  // -------------------------------------------------------------------

  
    /**
     * ✅ Obtiene coordenadas actuales del dispositivo
     * - Usa Capacitor Geolocation en iOS/Android
     * - Usa navigator.geolocation en Web
     */
    async obtenerCoordenadas(): Promise<{ lat: number; lng: number }> {
      const plataforma = Capacitor.getPlatform();

      // Web
      if (plataforma === 'web') {
        if (!('geolocation' in navigator)) {
          console.warn('Geolocalización no disponible en este navegador.');
          return { lat: 0, lng: 0 };
        }

        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
            },
            (error) => {
              console.error('Error al obtener coordenadas web:', error);
              resolve({ lat: 0, lng: 0 });
            }
          );
        });
      }

      // iOS / Android
      try {
        const permission = await Geolocation.checkPermissions();
        if (permission.coarseLocation === 'denied') {
          await this.solicitarPermiso('geolocation');
        }

        const position = await Geolocation.getCurrentPosition();
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      } catch (err) {
        console.error('Error al obtener coordenadas móvil:', err);
        return { lat: 0, lng: 0 };
      }
    }

}

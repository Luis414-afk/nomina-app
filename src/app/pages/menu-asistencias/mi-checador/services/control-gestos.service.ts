import { Injectable } from '@angular/core';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';

import { Capacitor } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class ControlGestosService {
  constructor() { }

  private originalBrightness: number | null = null; // valor original


  // Establecer un umbral para el ratio que indique un gesto de sonreír
  private umbralSONRISA:number = 0.0051;
  private umbralBOCA:number = 0.05581;

  private distance(p1: any, p2: any) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }
  
  detectSmile(results: any): boolean {
    // Obtener puntos de referencia de la cara
    const landmarks = results.multiFaceLandmarks[0];
    if (!landmarks || landmarks.length < 292) return false;
  
    // Puntos clave en la boca
    const leftMouthCorner = landmarks[61];
    const rightMouthCorner = landmarks[291];
    const topLipCenter = landmarks[13];
    const bottomLipCenter = landmarks[14];
  
    // Calcular distancias
    const mouthWidth = this.distance(leftMouthCorner, rightMouthCorner);
    const mouthHeight = this.distance(topLipCenter, bottomLipCenter);
    const mouthRatio = mouthHeight / mouthWidth;
  
    // Logs
    console.log("Mouth Width:", mouthWidth);
    console.log("Mouth Height:", mouthHeight);
    console.log("Mouth Ratio:", mouthRatio);
  
    // Ajuste de umbrales
    const lowerThreshold = 0.08;
    const upperThreshold = 0.15;
  
    // Resultado y log
    const isSmiling = mouthRatio >= lowerThreshold && mouthRatio <= upperThreshold;
    console.log("¿Detecta sonrisa?:", isSmiling);
  
    return isSmiling;
  }
  
  


  detectOpenBoca(results:any):boolean {
    for (const landmarks of results.multiFaceLandmarks) {
          if((landmarks[14].y - landmarks[13].y) >= this.umbralBOCA){
            return true;
          }
         
    }

    return false;
  }


  parpadeoSimultaneo(results: any): boolean {
    for (const landmarks of results.multiFaceLandmarks) {
        // Log para mostrar las coordenadas de los puntos de los ojos
        console.log("Landmarks 374 y 386 - Y coords:", landmarks[374].y, landmarks[386].y);
        const deltaY1 = landmarks[374].y - landmarks[386].y;
        console.log("Delta Y 374-386:", deltaY1);

        console.log("Landmarks 145 y 159 - Y coords:", landmarks[145].y, landmarks[159].y);
        const deltaY2 = landmarks[145].y - landmarks[159].y;
        console.log("Delta Y 145-159:", deltaY2);

        // Aumentamos el umbral a 0.08 (o puedes probar 0.1 si es necesario)
        if (deltaY1 <= 0.020 && deltaY2 <= 0.020) {
            console.log("Parpadeo simultáneo detectado.");
            return true;
        }
    }
    console.log("No se detectó parpadeo simultáneo.");
    return false;
}





  private getFaceCenter(results:any) {
    // Obtener los puntos de referencia de la cara
    const landmarks = results.multiFaceLandmarks[0];
    // Inicializar las variables para almacenar el centro de la cara
    let faceCenter = {x: 0, y: 0};
    // Calcular el promedio de las coordenadas x e y de los puntos de referencia
    for (let i = 0; i < landmarks.length; i++) {
      faceCenter.x += landmarks[i].x;
      faceCenter.y += landmarks[i].y;
    }
    faceCenter.x /= landmarks.length;
    faceCenter.y /= landmarks.length;
    // Devolver el centro de la cara
    return faceCenter;
  }




  checkCenterFace(results:any){
    const faceCenter = this.getFaceCenter(results);
    

    const margin = 0.1;
    const gradosCARA = 10; 

    if (Math.abs(faceCenter.x - 0.5) < margin && Math.abs(faceCenter.y - 0.5) < margin  ) {
     return true;
    } 
     
    return false;
  }


 getEyeVisibility(results:any, eye:any) {
    // Obtener los puntos de referencia de la cara
    const landmarks = results.multiFaceLandmarks[0];
    // Definir los índices de los puntos de referencia del ojo según el parámetro eye
    let eyeInner, eyeOuter, eyeTop, eyeBottom;
    if (eye === 'left') {
      eyeInner = 133;
      eyeOuter = 33;
      eyeTop = 159;
      eyeBottom = 145;
    } else if (eye === 'right') {
      eyeInner = 362;
      eyeOuter = 263;
      eyeTop = 386;
      eyeBottom = 374;
    } else {
      return null;
    }
    // Obtener las coordenadas de los puntos de referencia del ojo
    const inner = landmarks[eyeInner];
    const outer = landmarks[eyeOuter];
    const top = landmarks[eyeTop];
    const bottom = landmarks[eyeBottom];
    // Calcular el área del triángulo formado por los puntos de referencia del ojo usando la fórmula de Herón
    // https://es.wikipedia.org/wiki/F%C3%B3rmula_de_Her%C3%B3n
    const a = Math.sqrt((inner.x - outer.x) ** 2 + (inner.y - outer.y) ** 2);
    const b = Math.sqrt((top.x - bottom.x) ** 2 + (top.y - bottom.y) ** 2);
    const c = Math.sqrt((inner.x - top.x) ** 2 + (inner.y - top.y) ** 2);
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    // Calcular el ángulo entre los vectores que unen el centro del ojo con los extremos del párpado
    // https://es.wikipedia.org/wiki/Producto_escalar
    const eyeCenter = {x: (inner.x + outer.x) / 2, y: (inner.y + outer.y) / 2};
    const v1 = {x: inner.x - eyeCenter.x, y: inner.y - eyeCenter.y};
    const v2 = {x: outer.x - eyeCenter.x, y: outer.y - eyeCenter.y};
    const dot = v1.x * v2.x + v1.y * v2.y;
    const angle = Math.acos(dot / (Math.sqrt(v1.x * v1.x + v1.y * v1.y) * Math.sqrt(v2.x * v2.x + v2.y * v2.y)));
      // Normalizar el área y el ángulo entre 0 y 1
    const areaNormalized = area / 0.0015; // 0.0015 es un valor arbitrario que se puede ajustar según el caso
    const angleNormalized = angle / Math.PI;
    // Calcular la visibilidad del ojo como el promedio del área y el ángulo normalizados
    const visibility = (areaNormalized + angleNormalized) / 2;
    // Devolver la visibilidad del ojo
    return visibility;
  }


  // 4️⃣ Levantar cejas
  detectRaiseEyebrows(results: any): boolean {
    const landmarks = results.multiFaceLandmarks[0];
    if (!landmarks) return false;

    const leftEyebrow = landmarks[105];  // ajustar según necesidad
    const rightEyebrow = landmarks[334];
    const eyeTop = (landmarks[159].y + landmarks[386].y) / 2;

    return (leftEyebrow.y < eyeTop - 0.02) && (rightEyebrow.y < eyeTop - 0.02);
  }

  // 5️⃣ Guiñar ojo (uno solo)
  detectWink(results: any): boolean {
    const leftEye = this.getEyeVisibility(results, 'left') || 0;
    const rightEye = this.getEyeVisibility(results, 'right') || 0;
  
    const cierreMin = 0.05;  // ojo casi cerrado
    const abiertoMin = 0.25; // ojo claramente abierto
  
    return (leftEye < cierreMin && rightEye > abiertoMin) || 
           (rightEye < cierreMin && leftEye > abiertoMin);
  }
  

  // 6️⃣ Sacar lengua
  detectTongueOut(results: any): boolean {
    const landmarks = results.multiFaceLandmarks[0];
    if (!landmarks) return false;

    const tongueTip = landmarks[17]; // punta de la lengua
    const bottomLip = landmarks[14];

    return (tongueTip.y - bottomLip.y) > 0.03; // ajustar según cámara
  }

  // 7️⃣ Levantar cabeza
  detectHeadLift(results: any): boolean {
    const landmarks = results.multiFaceLandmarks[0];
    if (!landmarks) return false;

    const noseTip = landmarks[1];      // punta de la nariz
    const chin = landmarks[152];       // mentón

    return (chin.y - noseTip.y) < 0.18; // ajusta según altura de la cámara
  }

  async setBrightnessMax() {
    if (Capacitor.getPlatform() === 'web') return;
  
    try {
      const result = await ScreenBrightness.getBrightness();
      
      // Guardamos el valor original solo la primera vez
      if (this.originalBrightness === null) {
        this.originalBrightness = result.brightness;
      }
  
      // Solo cambiar si no está al máximo
      if (result.brightness < 1.0) {
        await ScreenBrightness.setBrightness({ brightness: 1.0 });
      }
      
    } catch (error) {
      console.warn('No se pudo cambiar el brillo:', error);
    }
  }
  
  async restoreBrightness() {
    if (Capacitor.getPlatform() === 'web') return;
  
    try {
      if (this.originalBrightness !== null) {
        const result = await ScreenBrightness.getBrightness();
        const current = result.brightness; // <-- accede a la propiedad
        if (current !== this.originalBrightness) {
          await ScreenBrightness.setBrightness({ brightness: this.originalBrightness });
        }
      }
    } catch (error) {
      console.warn('No se pudo restaurar el brillo:', error);
    }
  }
  
  
  

}

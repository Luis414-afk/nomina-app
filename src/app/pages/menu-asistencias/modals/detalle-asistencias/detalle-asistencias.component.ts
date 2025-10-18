import { Component, OnInit } from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { ModalController } from '@ionic/angular';
import OlVector from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlFeature from 'ol/Feature';
import OlGeomPoint from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import * as moment from 'moment';
@Component({
  selector: 'app-detalle-asistencias',
  templateUrl: './detalle-asistencias.component.html',
  styleUrls: ['./detalle-asistencias.component.scss'],
})
export class DetalleAsistenciasComponent implements OnInit {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  vectorLayer: OlVectorLayer;
  estado: number = 1;
  currentDate: string = '';
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    moment.locale('es'); // Establece el idioma a español
    this.currentDate = moment().format('ddd, D [de] MMM [de] YYYY, HH:mm:ss');

    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    // Utiliza las coordenadas correctas
    const markerCoords = [-99.205199, 19.723754]; // Longitud, Latitud

    this.view = new OlView({
      center: fromLonLat(markerCoords),
      zoom: 12 // Ajusta el zoom según sea necesario
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });

    // Crear el marcador
    const marker = new OlFeature({
      geometry: new OlGeomPoint(fromLonLat(markerCoords))
    });

    // Estilo del marcador con icono de internet
    marker.setStyle(new Style({
      image: new Icon({
        src: '../../assets/icon/reconocimiento-facial.png', // URL de un icono de marcador
        scale: 0.1 // Ajusta el tamaño del icono según sea necesario
      })
    }));

    // Crea una fuente vectorial y agrega el marcador
    const vectorSource = new OlVector({
      features: [marker]
    });

    // Crea una capa vectorial y agrégala al mapa
    this.vectorLayer = new OlVectorLayer({
      source: vectorSource
    });

    this.map.addLayer(this.vectorLayer);
  }

  close(): void {
    this.modalCtrl.dismiss(null);
  }
}

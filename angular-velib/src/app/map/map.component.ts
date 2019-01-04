import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Station} from '../station';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Point from 'ol/geom/Point.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import VectorSource from 'ol/source/Vector.js';
import OSM from 'ol/source/OSM.js';
import {fromLonLat} from 'ol/proj';
import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from 'ol/style.js';
import Overlay from 'ol/Overlay.js';

declare var $: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input()
  station: Station;
  @Input()
  listeStations: Station[];
  iconFeature: Feature[];
  listeStationsProches: Station[];

  map: any;
  estPret = false;

  constructor() {
  }

  ngOnInit() {
    this.listeStationsProches = Station.getStationsAProximite(this.listeStations, this.station);
    console.log(this.listeStationsProches);
    this.createIcon(this.station, this.listeStationsProches);
    this.addMap();
    this.estPret = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.estPret) {
      this.map.setTarget(null);
      this.map = null;
      this.listeStationsProches = Station.getStationsAProximite(this.listeStations, changes.station.currentValue);
      this.createIcon(changes.station.currentValue, this.listeStationsProches);
      this.addMap();
    }
  }

  createIcon(ref: Station, listeStations: Station[]) {
    const self = this;
    this.iconFeature = [new Feature({
      geometry: new Point(fromLonLat([this.station.position.lng, this.station.position.lat])),
      name: this.station.name,
      type: 'root',
      description: `${this.station.name}<br>Place(s) libre(s) : ${this.station.available_bike_stands} <br> Vélo(s) disponible(s) : ${this.station.available_bikes}`
    })];
    listeStations.forEach(function (station) {
      if (self.station.number !== station.number) {
        self.iconFeature.push(
          new Feature({
            geometry: new Point(fromLonLat([station.position.lng, station.position.lat])),
            name: station.name,
            type: 'other',
            description: `${station.name}<br>Place(s) libre(s) : ${station.available_bike_stands} <br> Vélo(s) disponible(s) : ${station.available_bikes}`
          })
        );
      }
    });
  }

  addMap() {
    const self = this;
    const vectorSource = new VectorSource({
      features: this.iconFeature
    });
    
    const styles = {
        'root': new Style({
          image: new Icon(/** {module:ol/style/Icon~Options} */ ({
            anchor: [0.5, 0],
            anchorOrigin: 'bottom-left',
            scale: 0.08,
            src: 'assets/mainStation.png'
          }))
        }),
        'other': new Style({
          image: new Icon(/** {module:ol/style/Icon~Options} */ ({
            anchor: [0.5, 0],
            anchorOrigin: 'bottom-left',
            scale: 0.08,
            src: 'assets/secondaryStation.jpg'
          }))
        })
      }
    ;
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: function (feature) {
        return styles[feature.get('type')];
      }
    });
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }), vectorLayer
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([this.station.position.lng, this.station.position.lat]),
        zoom: 15
      })
    });

    const element = document.getElementById('popup');

    const popup = new Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -30]
    });
    this.map.addOverlay(popup);

    this.map.on('click', function (evt) {
      const feature = self.map.forEachFeatureAtPixel(evt.pixel,
        function (feat) {
          return feat;
        });
      if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);
        $(element).popover('dispose');
        $(element).popover({
          placement: 'top',
          html: true,
          content: feature.get('description')
        });
        $(element).popover('show');
      } else {
        $(element).popover('dispose');
      }
    });

  }
}

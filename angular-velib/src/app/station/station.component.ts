import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contrat} from '../contrat';
import {Station} from '../station';
import {DecauxAPIService} from '../decaux-api.service';
declare var ol: any;

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  @Input()
  contrat: Contrat;
  @Output()
  changeVille: EventEmitter<string> = new EventEmitter<string>();
  nom_contrat: string;
  listeStations: Station[];
  message: string;
  stationSelected: Station;
  isSelected = false;

  latitude: number;
  longitude: number;


  map: any;

  constructor(private api: DecauxAPIService) {
  }

  ngOnInit() {
    this.nom_contrat = this.contrat.name;

    this.recupereStations(this.nom_contrat);
  }

  addMap() {
    this.latitude = this.listeStations[0].position.lat;
    this.longitude = this.listeStations[0].position.lng;
    console.log(this.latitude);
    console.log(this.longitude);

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 15
      })
    });
  }

  recupereStations(nom_contrat: string): void {
    this.message = null;
    this.api.recupereStations(nom_contrat).subscribe(
      (data: Station[]) => {
        this.listeStations = data;
      },
      error => {
        this.message = error.message;
      },
      () => this.addMap()
    );
  }

}

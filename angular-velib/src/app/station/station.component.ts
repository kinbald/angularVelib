import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contrat} from '../contrat';
import {Station} from '../station';
import {DecauxAPIService} from '../decaux-api.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  @Input()
  contrat: Contrat;
  @Output()
  changementVille: EventEmitter<string> = new EventEmitter<string>();

  nom_contrat: string;
  listeStations: Station[];
  stationSelected: Station;
  isSelected = false;

  constructor(private api: DecauxAPIService) {  }

  ngOnInit() {
    this.nom_contrat = this.contrat.name;
    this.recupereStations(this.nom_contrat);
  }

  private retour(): void {
    this.changementVille.emit('changementVille');
  }

  verifStationChoisie() {
    if (this.stationSelected != null) {
      this.isSelected = true;
    }
  }

  stationChoisie(name: string): void {
    this.stationSelected = this.listeStations.filter((value: Station) => value.name === name)[0];
  }

  recupereStations(nom_contrat: string): void {
    this.api.recupereStations(nom_contrat).subscribe(
      (data: Station[]) => {
        this.listeStations = data;
      }
    );
  }

}

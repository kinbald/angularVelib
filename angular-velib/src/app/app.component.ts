import {Component, OnInit} from '@angular/core';
import {DecauxAPIService} from './decaux-api.service';
import {Contrat} from './contrat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DecauxAPIService]
})
export class AppComponent implements OnInit {
  title = 'angular-velib';
  contrats = [];
  selection: Contrat;
  estSelectionne = false;

  constructor(private api: DecauxAPIService) { }

  ngOnInit(): void {
    this.recupereContrats();
  }

  verifVilleChoisie() {
    if (this.selection != null) {
      this.estSelectionne = true;
    }
  }

  changementVille($event): void {
    this.estSelectionne = false;
    this.selection = null;
  }

  contratChoisi(name: string): void {
    this.selection = this.contrats.filter((value: Contrat) => value.name === name)[0];
  }

  recupereContrats(): void {
    this.api.recupereContrats().subscribe(
      (data: Contrat[]) => {
        this.contrats = data.sort((contrat1: Contrat, contrat2: Contrat) => contrat1.name.localeCompare(contrat2.name));
      }
    );
  }
}

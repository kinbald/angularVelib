import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contrat} from './contrat';
import {Station} from './station';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DecauxAPIService {

  constructor(private Http: HttpClient) { }

    public recupereContrats(): Observable<Contrat[]> {
    const urlReq = environment.API_ADDR_CONTRATS + `&apiKey=${environment.API_TOKEN}`;
    const result: Observable<Contrat[]> = this.Http.get<Contrat[]>(urlReq);
    result.pipe(catchError(this.handleError));
    return result;
    }

    public recupereStations(nom_contrat: string): Observable<Station[]> {
    const urlReq = environment.API_ADDR_STATIONS + `?contract=${nom_contrat}&apiKey=${environment.API_TOKEN}`;
    return this.Http.get<Station[]>(urlReq);
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }
}

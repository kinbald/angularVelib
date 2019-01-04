import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contrat} from './contrat';
import {Station} from './station';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecauxAPIService {

  constructor(private Http: HttpClient) { }

    public recupereContrats(): Observable<Contrat[]> {
    const result: Observable<Contrat[]> = this.Http.get<Contrat[]>('https://api.jcdecaux.com/vls/v1/contracts?contracts&apiKey=9d4a659bfa19ef88c0d7bd9fbe733ec15384df49');
    result.pipe(catchError(this.handleError));
    return result;
    }

    public recupereStations(nom_contrat: string): Observable<Station[]> {
    return this.Http.get<Station[]>(`https://api.jcdecaux.com/vls/v1/stations?contract=${nom_contrat}&apiKey=9d4a659bfa19ef88c0d7bd9fbe733ec15384df49`);
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

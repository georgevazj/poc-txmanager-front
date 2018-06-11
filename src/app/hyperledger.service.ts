import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Request, Response } from './models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
};

@Injectable({
  providedIn: 'root'
})
export class HyperledgerService {

  private apiUrl = 'http://localhost:9090/tx'

  constructor(private http: HttpClient) { }

  getTx(input:string): Observable<Response> {
    return this.http.get<Response>(this.apiUrl + '/' + input)
    .pipe(
      catchError(this.handleError<Response>('getTx'))
    );
  }

  postTx(request:Request): Observable<Request> {
    return this.http.post<Request>(this.apiUrl, request, httpOptions).pipe(
      catchError(this.handleError<Request>('postTx'))
    );
  }

  private log(message: string) {
    console.log(message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

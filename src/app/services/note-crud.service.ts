import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import {Note } from '../@entities/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteCrudService {

    endpoint = 'https://gollum-notes.herokuapp.com/api/Notes';

    constructor(private readonly httpClient: HttpClient) { }

    getNote(id): Observable<Note[]> {
       return this.httpClient.get<Note[]>(this.endpoint + '/' + id)
         .pipe(
           tap(_ => console.log(`Note fetched: ${id}`)),
           catchError(this.handleError<Note[]>(`Get not id=${id}`))
         );
    }

    getNotes(): Observable<Note[]> {
      return this.httpClient.get<Note[]>(this.endpoint)
       .pipe(
       catchError(this.handleError<Note[]>('Get note', []))
       );
    }

  //   getNotes(): Observable<Note[]> {
  //   return this.httpClient.get<Note[]>(this.endpoint)
  //     .pipe(
  //       tap(notes => console.log('Notes retrieved!')),
  //       catchError(this.handleError<Note[]>('Get note', []))
  //     );
  // }



  private handleError<T>(operation = 'operation', result?: T) {
    console.log("ERREUR")
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';


import {Profile, createProfile } from '../@entities/Profile';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  endpoint = 'https://gollum-notes.herokuapp.com/api/Auth';

  constructor(private httpClient: HttpClient) { }



  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };



    registerUser(profile: Profile): Observable<Profile> {
      console.log("appel de register " + JSON.stringify(profile))
    return this.httpClient.post<Profile>(this.endpoint + "/register", JSON.stringify(profile), this.httpOptions)
     .pipe(
       catchError((err) => {
         console.error("ca me clc" + err);
         throw err;
          }
        )
      )
  }

//   registerUser(profile: Profile): Observable<Profile> {
//     console.log("appel de register " + JSON.stringify(profile))
//   return this.httpClient.post<Profile>(this.endpoint + "/register", JSON.stringify(profile), this.httpOptions)
//     .pipe(
//     tap((newUser: Profile) => console.log(`added User w/ id=${newUser.username}`)),
//     // catchError(this.handleError<Profile>('addUser'))
//     catchError(this.handleError<Profile>('addUser'))
//   );
// }

private handleError<T>(operation = 'operation', result?: T) {
    console.log("ERREUR userCrudService")

    return (error: any): Observable<T> => {
      console.log("ERREUR2 userCrudService")
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
 }


}

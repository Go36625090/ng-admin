import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {TokenService} from "./token.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private heroesUrl = 'api/permissions';  // URL to web api
  constructor(private api: ApiService, private userToken: TokenService,
              private http: HttpClient) {

  }

  login(){
    this.api.post('', {}).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }


  /** GET heroes from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.heroesUrl)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}

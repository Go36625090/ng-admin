import {Inject, Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {TokenService} from "./token.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {User} from "../models/user";
import {LOGIN_URL} from "../consts";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private heroesUrl = '/turbo-trader/api/users';  // URL to web api
  constructor(private api: ApiService, private tokenService: TokenService,
              private http: HttpClient, @Inject(LOGIN_URL) private loginUrl: string,
              private router: Router, private route: ActivatedRoute) {
  }

  logout(){
    this.tokenService.removeAuthorizationToken();
    this.router.navigateByUrl('/user/login' ,
      { skipLocationChange: false } ).then(r => console.log(r));
  }

  login(){
    this.api.get('/login').subscribe({
      next: (v) => {
        console.log(v);
        this.router.navigateByUrl('/' ,
          { skipLocationChange: false } ).then(r => console.log(r));
      },
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

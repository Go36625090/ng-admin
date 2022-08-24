import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, Observable} from "rxjs";

import {APIService} from "../api";
import {APIResponse} from "../api/response";
import {LoggingService} from "./logging.service";
import {Log} from "../log";
import {API} from "../api/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements APIService{
  private readonly api: string
  private log: Log;

  constructor(private http: HttpClient, private logging: LoggingService) {
    this.api = environment.api;
    this.log = console;
  }

  public get(path: string,  headers?: HttpHeaders): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.toURI(path), {headers: headers})
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => ApiService.deserialize(res))
      );
  }

  public post(path: API.path, body: object|undefined|null, headers?: HttpHeaders): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.toURI(path), body, {headers: headers})
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => ApiService.deserialize(res))
      );
  }

  private toURI(p: string): string {
    if (!p.startsWith('http')) {
      if (!p.startsWith('/')){
        return this.api + '/' +p;
      }
      return this.api + p;
    }
    return p;
  }

  private static deserialize(response: any): APIResponse {
    const apiResponse = {code: 0};
    Object.assign(apiResponse, response);
    return apiResponse;
  }

  private handleError(error: HttpErrorResponse, caught: Observable<any>): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.log.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.log.error(
        `Backend returned code ${error.status}, ` +
        `url was: ${error.url}`);
    }
    const message = `Backend returned code ${error.status}, ` +
      `url was: ${error.url}`;

    const response = {code: 255, message: message};
    return new Observable(subscriber => subscriber.error(response));
  }

}

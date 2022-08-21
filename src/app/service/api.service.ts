import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, Observable} from "rxjs";

import {APIResponse} from '../models/response'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly api: string

  constructor(private http: HttpClient) {
    this.api = environment.api;
  }


  post(path: string, body: object|undefined|null, headers?: HttpHeaders): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.toURI(path), body, {headers: headers})
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => ApiService.deserialize(res))
      );
  }

  private toURI(p: string): string {
    if (!p.startsWith('http')) {
      return this.api +  p;
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
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `url was: ${error.url}`);
    }
    const message = `Backend returned code ${error.status}, ` +
      `url was: ${error.url}`;

    const response = {code: 255, message: message};
    return new Observable(subscriber => subscriber.error(response));
  }

}

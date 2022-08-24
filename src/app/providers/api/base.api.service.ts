import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {APIService} from "./index";

import {API} from "./types";

import {catchError, map, Observable} from "rxjs";
import {APIResponse} from "./response";

export abstract class BaseApiService implements APIService{

  protected readonly api: string

  protected constructor(protected http: HttpClient) {
    this.api = environment.api;
  }

  abstract pathParse(path: API.endpoint | API.method): string;
  abstract bodyParse(path: API.endpoint | API.method, body: any): any;

  private static deserialize(response: any): APIResponse {
    const apiResponse = {code: 0};
    Object.assign(apiResponse, response);
    return apiResponse;
  }

  private handleError(error: HttpErrorResponse, caught: Observable<any>): Observable<any> {
    const message = `Backend returned code ${error.status}, `+ `url was: ${error.url}`;
    const response = {code: 255, message: message};
    return new Observable(subscriber => subscriber.error(response));
  }

  public get(path: API.endpoint|API.method,  headers?: HttpHeaders): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.pathParse(path), {headers: headers})
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }

  public post(path: API.endpoint|API.method, body: object|undefined|null, headers?: HttpHeaders): Observable<APIResponse> {

    return this.http.post<APIResponse>(this.pathParse(path), this.bodyParse(path, body), {headers: headers})
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }

  public put(path: API.endpoint| API.method, body: object|undefined|null, headers?: HttpHeaders): Observable<APIResponse> {
    return this.http.put<APIResponse>(this.pathParse(path), this.bodyParse(path, body), {headers: headers})
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }
  public patch(path: API.endpoint| API.method, body: object|undefined|null, headers?: HttpHeaders): Observable<APIResponse> {
    return this.http.patch<APIResponse>(this.pathParse(path), this.bodyParse(path, body),{headers: headers})
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }
  public delete(path: API.endpoint| API.method, headers?: HttpHeaders): Observable<APIResponse> {
    return this.http.delete<APIResponse>(this.pathParse(path), {headers: headers})
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }

  public options(path: API.endpoint| API.method, headers?: HttpHeaders): Observable<APIResponse> {
    return this.http.options<APIResponse>(this.pathParse(path), {headers: headers})
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }
}

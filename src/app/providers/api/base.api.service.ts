import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {APIService} from "./index";

import {API} from "./types";

import {catchError, map, Observable} from "rxjs";

export abstract class BaseApiService implements APIService{

  protected readonly api: string

  protected constructor(protected http: HttpClient) {
    this.api = environment.api;
  }

  abstract pathParse(path: API.endpoint): string;
  abstract bodyParse(path: API.endpoint, body: any): API.request;

  private static deserialize(response: any): API.response {
    const apiResponse = {code: 0};
    Object.assign(apiResponse, response);
    return <API.response>apiResponse;
  }

  private handleError(error: HttpErrorResponse, caught: Observable<any>): Observable<any> {
    const message = `Backend returned code ${error.status}, `+ `url was: ${error.url}`;
    const response = {code: 255, message: message};
    return new Observable(subscriber => subscriber.error(response));
  }

  public get(path: API.endpoint, params?: API.params, headers?: HttpHeaders): Observable<API.response> {
    const options = {headers: headers, params: params};

    return this.http.get<API.response>(this.pathParse(path), options )
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }

  public post(path: API.endpoint, body: object|undefined|null,params?: API.params, headers?: HttpHeaders): Observable<API.response> {
    const options = {headers: headers, params: params};
    return this.http.post<API.response>(this.pathParse(path), this.bodyParse(path, body), options)
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }

  public put(path: API.endpoint, body: object|undefined|null,params?: API.params, headers?: HttpHeaders): Observable<API.response> {
    const options = {headers: headers, params: params};
    return this.http.put<API.response>(this.pathParse(path), this.bodyParse(path, body), options)
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }
  public patch(path: API.endpoint, body: object|undefined|null,params?: API.params, headers?: HttpHeaders): Observable<API.response> {
    const options = {headers: headers, params: params};
    return this.http.patch<API.response>(this.pathParse(path), this.bodyParse(path, body),options)
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }
  public delete(path: API.endpoint,params?: API.params,headers?: HttpHeaders): Observable<API.response> {
    const options = {headers: headers, params: params};
    return this.http.delete<API.response>(this.pathParse(path), options)
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }

  public options(path: API.endpoint,params?: API.params, headers?: HttpHeaders): Observable<API.response> {
    const options = {headers: headers, params: params};
    return this.http.options<API.response>(this.pathParse(path), options)
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }
}

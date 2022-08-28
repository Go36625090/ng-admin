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

  private static deserialize<T>(response: any): API.response<T> {
    const apiResponse = {code: 0};
    Object.assign(apiResponse, response);
    return <API.response<T>>apiResponse;
  }

  private handleError(error: HttpErrorResponse, caught: Observable<any>): Observable<any> {
    const message = `Backend returned code ${error.status}, `+ `url was: ${error.url}`;
    const response = {code: 255, message: message};
    return new Observable(subscriber => subscriber.error(response));
  }

  public get<T>(path: API.endpoint, params?: API.params, headers?: HttpHeaders): Observable<API.response<T>> {
    const options = {headers: headers, params: params};

    return this.http.get<API.response<T>>(this.pathParse(path), options )
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }

  public post<T>(path: API.endpoint, body: any,params?: API.params, headers?: HttpHeaders):
    Observable<API.response<T>> {
    const options = {headers: headers, params: params};
    return this.http.post<API.response<T>>(this.pathParse(path), this.bodyParse(path, body), options)
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }

  public put<T>(path: API.endpoint, body: any,params?: API.params, headers?: HttpHeaders):
    Observable<API.response<T>> {
    const options = {headers: headers, params: params};
    return this.http.put<API.response<T>>(this.pathParse(path), this.bodyParse(path, body), options)
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }
  public patch<T>(path: API.endpoint, body: any,params?: API.params, headers?: HttpHeaders):
    Observable<API.response<T>> {
    const options = {headers: headers, params: params};
    return this.http.patch<API.response<T>>(this.pathParse(path), this.bodyParse(path, body),options)
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }
  public delete<T>(path: API.endpoint,params?: API.params,headers?: HttpHeaders): Observable<API.response<T>> {
    const options = {headers: headers, params: params};
    return this.http.delete<API.response<T>>(this.pathParse(path), options)
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }

  public options<T>(path: API.endpoint,params?: API.params, headers?: HttpHeaders): Observable<API.response<T>> {
    const options = {headers: headers, params: params};
    return this.http.options<API.response<T>>(this.pathParse(path), options)
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(
        map(res => BaseApiService.deserialize(res))
      );
  }
}

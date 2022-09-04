import {InjectionToken} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ApiService} from "./api.service";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {MockDataService} from "./mock.data.service";

import {API} from "./types";
import {RouterService} from "../../service/router.service";

export interface APIService {
  get<T>(e: API.endpoint, params?: API.params, headers?: HttpHeaders): Observable<API.response<T>>;

  put<T>(e: API.endpoint, body: any,params?: API.params, headers?: HttpHeaders): Observable<API.response<T>>;

  post<T>(e: API.endpoint, body: any,params?: API.params, headers?: HttpHeaders): Observable<API.response<T>>;

  patch<T>(e: API.endpoint, body: any, params?: API.params, headers?: HttpHeaders): Observable<API.response<T>>;

  delete<T>(e: API.endpoint, params?: API.params, headers?: HttpHeaders): Observable<API.response<T>>;

  options<T>(e: API.endpoint,params?: API.params, headers?: HttpHeaders): Observable<API.response<T>>
}

export const API_SERVICE = new InjectionToken<APIService>('API_SERVICE');

export const API_SERVICE_PROVIDER = {
  provide: API_SERVICE,
  useClass: ApiService,
  deps: [HttpClient, RouterService]
};

export const MockWebApiModule = environment.production ?
  [] : HttpClientInMemoryWebApiModule.forRoot(
    MockDataService, {
      dataEncapsulation: true,
      apiBase: environment.api,
      passThruUnknownUrl: true,
      delay: 300,
    });

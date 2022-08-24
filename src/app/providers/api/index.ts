import {InjectionToken} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {APIResponse} from "./response";
import {environment} from "../../../environments/environment";
import {ApiService} from "./api.service";
import {MockApiService} from "./mock.api.service";
import {MockApiServiceInterceptor} from "./mock.api.service.interceptor";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in.memory.data.service";

import {API} from "./types";

export interface APIService {
  get(path: API.endpoint | API.method, headers?: HttpHeaders): Observable<APIResponse>;

  put(path: API.endpoint | API.method, body: object | undefined | null, headers?: HttpHeaders): Observable<APIResponse>;

  post(path: API.endpoint | API.method, body: object | undefined | null, headers?: HttpHeaders): Observable<APIResponse>;

  patch(path: API.endpoint | API.method, body: object | undefined | null, headers?: HttpHeaders): Observable<APIResponse>;

  delete(path: API.endpoint | API.method, headers?: HttpHeaders): Observable<APIResponse>;

  options(path: API.endpoint | API.method, headers?: HttpHeaders): Observable<APIResponse>
}

export const API_SERVICE = new InjectionToken<APIService>('API_SERVICE');

export const API_SERVICE_PROVIDER = {
  provide: API_SERVICE,
  useClass: environment.production ? ApiService : MockApiService,
  deps: [HttpClient]
};

export const MockWebApiModuleInterceptor = environment.production ? [] : MockApiServiceInterceptor;

export const MockWebApiModule = environment.production ?
  [] : HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, {
      dataEncapsulation: true,
      apiBase: environment.api.startsWith('/') ? environment.api.substring(1) : environment.api,
      passThruUnknownUrl: true,
      delay: 1000,
    });

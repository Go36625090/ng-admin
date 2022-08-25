import {InjectionToken} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ApiService} from "./api.service";
import {MockApiService} from "./mock.api.service";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in.memory.data.service";

import {API} from "./types";

export interface APIService {
  get(e: API.endpoint, params?: API.params, headers?: HttpHeaders): Observable<API.response>;

  put(e: API.endpoint, body: object | undefined | null,params?: API.params, headers?: HttpHeaders): Observable<API.response>;

  post(e: API.endpoint, body: object | undefined | null,params?: API.params, headers?: HttpHeaders): Observable<API.response>;

  patch(e: API.endpoint, body: object | undefined | null, params?: API.params, headers?: HttpHeaders): Observable<API.response>;

  delete(e: API.endpoint, params?: API.params, headers?: HttpHeaders): Observable<API.response>;

  options(e: API.endpoint,params?: API.params, headers?: HttpHeaders): Observable<API.response>
}

export const API_SERVICE = new InjectionToken<APIService>('API_SERVICE');

export const API_SERVICE_PROVIDER = {
  provide: API_SERVICE,
  useClass: environment.production ? ApiService : MockApiService,
  deps: [HttpClient]
};

export const MockWebApiModule = environment.production ?
  [] : HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, {
      dataEncapsulation: true,
      apiBase: environment.api,
      passThruUnknownUrl: true,
      delay: 1000,
    });

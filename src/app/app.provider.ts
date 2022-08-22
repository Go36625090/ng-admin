import {ApiService} from "./service/api.service";
import {MockApiService} from "./mock/mock-api.service";
import {API_SERVICE} from "./api";
import {environment} from "../environments/environment";
import {Urls} from "./consts/urls";
import {LOGIN_URL} from "./consts";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MockWebApiModuleInterceptor} from "./mock";
import {AuthInterceptor} from "./auth/auth-interceptor";

export const LOGIN_URL_PROVIDER = { provide: LOGIN_URL, useValue: Urls.LOGIN_URL};
export const API_SERVICE_PROVIDER = { provide: API_SERVICE, useExisting: environment.production? ApiService: MockApiService};
export const HTTP_INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: MockWebApiModuleInterceptor, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
]
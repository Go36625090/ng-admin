import {ApiService} from "./providers/api/api.service";
import {MockApiService} from "./providers/api/mock.api.service";
import {API_SERVICE, MockWebApiModuleInterceptor} from "./providers/api";
import {environment} from "../environments/environment";
import {Urls} from "./consts/urls";
import {LOGIN_ENDPOINT} from "./consts";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {ApiAuthInterceptor} from "./providers/api/api.auth.interceptor";
import {TraceInterceptor} from "./core/trace.interceptor";


export const HTTP_INTERCEPTOR_PROVIDERS = [
  {provide: HTTP_INTERCEPTORS, useClass: MockWebApiModuleInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ApiAuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: TraceInterceptor, multi: true}
]

export const LOGIN_URL_PROVIDER = {provide: LOGIN_ENDPOINT, useValue: Urls.LOGIN_URL};



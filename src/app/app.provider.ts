import {Urls} from "./consts/urls";
import {LOGIN_ENDPOINT} from "./consts";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiAuthInterceptor} from "./providers/api/api.auth.interceptor";
import {TraceInterceptor} from "./core/trace.interceptor";


export const HTTP_INTERCEPTOR_PROVIDERS = [
  {provide: HTTP_INTERCEPTORS, useClass: ApiAuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: TraceInterceptor, multi: true}
]

export const LOGIN_URL_PROVIDER = {provide: LOGIN_ENDPOINT, useValue: Urls.LOGIN_URL};



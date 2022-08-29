import {Urls} from "./consts/urls";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiAuthInterceptor} from "./common/api/api.auth.interceptor";
import {TraceInterceptor} from "./common/interceptor/trace.interceptor";


export const HTTP_INTERCEPTOR_PROVIDERS = [
  {provide: HTTP_INTERCEPTORS, useClass: ApiAuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: TraceInterceptor, multi: true}
]

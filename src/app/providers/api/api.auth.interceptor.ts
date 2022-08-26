import { Inject, Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable, tap} from "rxjs";
import {TokenService} from "../../service/token.service";
import {LogService} from "../../log/log.service";
import {LOGIN_ENDPOINT} from "../../consts";
import {API} from "./types";

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor{
  constructor(private auth: TokenService, private logging: LogService,
              @Inject(LOGIN_ENDPOINT) private loginUrl: string ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = this.auth.getToken();
    const headers = req.headers;
    if(authToken){
      headers.set('Authorization', authToken)
    }
    const authReq = req.clone({
      headers: headers
    });

    return next.handle(authReq)
      .pipe(
        tap({
          // next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
          next: (event) => {
            if (event instanceof HttpResponse) {
              const response: HttpResponse<API.response<any>> = event;
              if (response.status === 401) {
                this.auth.removeToken();
                location.replace(this.loginUrl);
              }
            }
            return event;
          },
        })
      );
  }
}

import { Inject, Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable, tap} from "rxjs";
import {TokenService} from "../../service/token.service";
import {LoggingService} from "../../log/logging.service";
import {APIResponse} from "./response";
import {LOGIN_ENDPOINT} from "../../consts";

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor{
  constructor(private auth: TokenService, private logging: LoggingService,
              @Inject(LOGIN_ENDPOINT) private loginUrl: string ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    return next.handle(authReq)
      .pipe(
        tap({
          // next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
          next: (event) => {
            if (event instanceof HttpResponse) {
              const response: HttpResponse<APIResponse> = event;
              if (!response.body){
                return;
              }
              if (response.body.code === 0 && isAuthFail(response.body.code)) {
                this.auth.removeAuthorizationToken();
              }
              if (response.body.code === 0 && isAuthFail(response.body.code ) && location.pathname !== this.loginUrl) {
                location.replace(this.loginUrl);
              }
            }
          }
        })
      );
  }
}

function isAuthFail(code: number): boolean {
  switch (code) {
    case 2000:
    case 2001:
    case 2002:
      return true;
  }
  return false;
}


import { Inject, Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {finalize, Observable, tap} from "rxjs";
import {TokenService} from "../service/token.service";
import {LoggingService} from "../service/logging.service";
import {APIResponse} from "../api/response";
import {LOGIN_URL} from "../consts";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private auth: TokenService, private logging: LoggingService,
              @Inject(LOGIN_URL) private loginUrl: string ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    const started = Date.now();
// extend server response observable with logging
    let ok: string;
    return next.handle(authReq)
      .pipe(
        tap({
          // Succeeds when there is a response; ignore other events
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
          },
          // Operation failed; error is an HttpErrorResponse
          error: (error) => (this.logging.bind(this).error(error.message))
        }),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
          this.logging.bind(this).debug(msg);
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


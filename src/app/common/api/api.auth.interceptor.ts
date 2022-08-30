import { Inject, Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable, tap} from "rxjs";
import {TokenService} from "../../service/token.service";
import {LogService} from "../log/log.service";
import {API} from "./types";
import {Urls} from "../../consts/urls";
import {RouterService} from "../../service/router.service";

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor{
  constructor(private auth: TokenService, private rs: RouterService ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the i18n.
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
                this.rs.jumpToLogin();
              }
            }
            return event;
          },
        })
      );
  }
}

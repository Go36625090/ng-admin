import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from "rxjs";
import {TokenService} from "../../service/token.service";


@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor{
  constructor(private auth: TokenService ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the i18n.
    const authToken = this.auth.getToken();
    let headers = req.headers;
    if(authToken){
      headers = headers.set('authorization', authToken)
    }
    const authReq = req.clone({
      headers: headers
    });
    return next.handle(authReq);
  }
}

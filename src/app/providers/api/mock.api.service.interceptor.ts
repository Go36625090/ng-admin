import {Inject, Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenService} from "../../service/token.service";
import {LoggingService} from "../../log/logging.service";
import {finalize, Observable, tap} from "rxjs";
import {LOGIN_ENDPOINT} from "../../consts";
import {Log} from "../../log";

@Injectable()
export class MockApiServiceInterceptor implements HttpInterceptor{
  private log: Log;
  constructor(private auth: TokenService, private logging: LoggingService,
              @Inject(LOGIN_ENDPOINT) private loginUrl: string ) {

    this.log = logging.bind(this);

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken),
      method: 'GET',
    });
// extend server response observable with logging
    return next.handle(authReq)
      .pipe(
        tap({
          // Succeeds when there is a response; ignore other events
          // next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
          next: (event) => {
            // this.log.info("response", event);
            return event;
          }
        })
      );
  }
}

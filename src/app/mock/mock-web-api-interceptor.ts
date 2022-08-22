import {Inject, Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenService} from "../service/token.service";
import {LoggingService} from "../service/logging.service";
import {finalize, Observable, tap} from "rxjs";
import {LOGIN_URL} from "../consts";

@Injectable()
export class MockWebApiInterceptor implements HttpInterceptor{
  private log: any;
  constructor(private auth: TokenService, private logging: LoggingService,
              @Inject(LOGIN_URL) private loginUrl: string ) {

    this.log = logging.bind(this);

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken),
      method: 'GET',
    });

    const started = Date.now();
// extend server response observable with logging
    let ok: string;
    this.log.error("req", authReq.url).call(this);
    // this.logging.info("req", authReq.url);
    return next.handle(authReq)
      .pipe(
        tap({
          // Succeeds when there is a response; ignore other events
          // next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
          next: (event) => {
            //this.logging.info(this,'mock client', event);
          },
          // Operation failed; error is an HttpErrorResponse
          error: (error) => (this.logging._error(error.message))
        }),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
          this.logging._debug(msg);
        })
      );
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {finalize, Observable, tap} from 'rxjs';
import {LogService} from "../log/log.service";
import {Log} from "../log";

@Injectable()
export class TraceInterceptor implements HttpInterceptor {
  private log: Log;
  constructor(private logging: LogService) {
    this.log = logging.bind(this);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let okCode: number;
    let errCode: number = 0;
    return next.handle(req)
      .pipe(
        tap(
          {
            next: value => {
              okCode = value instanceof HttpResponse<any> ? value.status : 0;
              this.log.debug(`${req.method} "${req.urlWithParams}"`, 'response: ', value);
              return value;
            },
            error: err => errCode = err.status
          }
        ),
        finalize(() => {
          if(0 == errCode){
            const elapsed = Date.now() - started;
            const msg = `${req.method} "${req.urlWithParams}" ${okCode} in ${elapsed} ms.`;
            this.log.info(msg);

          }else {
            const elapsed = Date.now() - started;
            const msg = `${req.method} "${req.urlWithParams}" ${errCode} in ${elapsed} ms.`;
            this.log.error(msg);
          }

        })
      );
  }
}

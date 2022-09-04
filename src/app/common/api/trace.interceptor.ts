import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpHeaderResponse, HttpSentEvent, HttpProgressEvent, HttpUserEvent
} from '@angular/common/http';
import {finalize, Observable, tap} from 'rxjs';
import {Log} from "../log";
import {LogService} from "../log/log.service";

@Injectable()
export class TraceInterceptor implements HttpInterceptor {
  private log: Log;
  private response: HttpSentEvent | HttpHeaderResponse | HttpResponse<any> | HttpProgressEvent | HttpUserEvent<any> | undefined;

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
            next: (value) => (this.response = value, value),
            error: err => (this.response = err, err)
          }
        ),
        finalize(() => {
          if(0 == errCode){
            const elapsed = Date.now() - started;
            const msg = `${req.method} "${req.urlWithParams}" in ${elapsed} ms.`;
            this.log.info(req.headers, this.response, msg);
          }else {
            const elapsed = Date.now() - started;
            const msg = `${req.method} "${req.urlWithParams}" in ${elapsed} ms.`;
            this.log.error(req.headers, this.response, msg);
          }
        })
      );
  }
}

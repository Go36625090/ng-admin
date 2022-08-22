import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  info(target: any, ...data: any[]):void{
    const log = console.info.bind(target, ...data);
    log.apply(target);
    console.log(target);
  }

  error(...data: any[]):void{
    console.error(...data);
  }

  debug(...data: any[]):void{
    console.debug(...data);
  }

}

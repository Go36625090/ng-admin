/**
 * using strict
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private log: any
  constructor() {
    if (Function.prototype.bind) {
      this.log = Function.prototype.bind.call(console.log, console);
    }
    else {
      this.log = function() {
        Function.prototype.apply.call(console.log, console, arguments);
      };
    }

  }

  bind(target: any): any{
    Object.defineProperty(this, "error", {
      get: ()=>this._error.bind(console, target.constructor.name,'['+Date.now()+']', '[ERROR]')
    });
    Object.defineProperty(this, "info", {
      get: ()=>this._info.bind(console, target.constructor.name,'['+Date.now()+']', '[INFO]')
    });
    Object.defineProperty(this, "debug", {
      get: ()=>this._debug.bind(console, target.constructor.name,'['+Date.now()+']', '[DEBUG]')
    });
    return this;
  }

  _info(...data: any[]): any{
    console.info(...data);
    return console.info.bind(console, ...data);
  }

  _error(...data: any[]):any{
    let stackLine2 = new Error().stack;

    if(stackLine2){
      console.log(stackLine2.toString().slice(0,200));
      let stackLine = stackLine2.toString().split('\n')[2]

      let caller_line = stackLine.slice(stackLine.lastIndexOf('/'),stackLine.lastIndexOf(')'))
      console.log(caller_line);
    }


    console.error(...data);
    return console.error.bind(console, ...data);
  }

  _debug(...data: any[]): any{
    console.debug(...data);
    return console.debug.bind(console, ...data);
  }

}

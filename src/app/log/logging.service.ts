/**
 * using strict
 */

import {Inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Log, LOG_LEVEL} from "./index";
import {Level} from "./level";
import {AppConfig} from "../app.config";

@Injectable({
  providedIn: 'root',
  deps: [AppConfig]
})
export class LoggingService {
  constructor(@Inject(LOG_LEVEL)private level: Level) {}

  bind(target: any): Log{
    const log = new LoggingService(this.level);

    Object.defineProperty(log, "info", {
      get: log._bind(Level.INFO, target )
    });
    Object.defineProperty(log, "warn", {
      get: log._bind(Level.WARN, target )
    });

    Object.defineProperty(log, "error", {
      get: log._bind(Level.ERROR, target )
    });

    Object.defineProperty(log, "debug", {
      get: log._bind(Level.DEBUG, target )
    });

    Object.defineProperty(log, "trace", {
      get: log._bind(Level.TRACE, target )
    });
    Object.defineProperty(log, "any", {
      get: log._any(Level.NONE, target )
    });
    // @ts-ignore
    return log;
  }

  private _bind(level: Level, target: any): any{
    let obj: any;
    let args: any[];
    switch (level) {
      case Level.INFO:
        args = ['['+Math.floor(Date.now()/1000)+']', `[INFO]`, `[${target.constructor.name}]`];
        obj = this._info.bind(this, ...args);
        break;
      case Level.WARN:
        args = ['['+Math.floor(Date.now()/1000)+']', `[WARN]`, `[${target.constructor.name}]`];
        obj = this._warn.bind(this, ...args);
        break;
      case Level.ERROR:
        args = ['['+Math.floor(Date.now()/1000)+']', `[ERROR]`, `[${target.constructor.name}]`];
        obj = this._error.bind(this, ...args);
        break;
      case Level.DEBUG:
        args = ['['+Math.floor(Date.now()/1000)+']', `[DEBUG]`, `[${target.constructor.name}]`];
        obj = this._debug.bind(this, ...args);
        break;
      case Level.TRACE:
        args = ['['+Math.floor(Date.now()/1000)+']', `[TRACE]`, `[${target.constructor.name}]`];
        obj = this._trace.bind(this, ...args);
        break;
      default:
        args = ['['+Math.floor(Date.now()/1000)+']', `[LOGGER]`, `[${target.constructor.name}]`];
        obj = this._any.bind(this, ...args);
        break;
    }
    return obj
  }

  _info(...data: any[]): any{
    const other_level = this.level == Level.WARN || this.level == Level.ERROR;
    return environment.production || other_level ? ()=>()=>{}: console.info.bind(console.info, ...data);
  }

  _error(...data: any[]): any{
    return environment.production? ()=>()=>{}: console.error.bind(console, ...data);
  }

  _debug(...data: any[]): any{
    return environment.production ||
            this.level != Level.DEBUG? ()=>()=>{} :
              console.debug.bind(console, ...data);
  }

  _trace(...data: any[]): any{
    return environment.production||
            this.level != Level.TRACE? ()=>()=>{} :
              console.trace.bind(console, ...data);
  }

  _warn(...data: any[]): any{
    return environment.production || this.level == Level.ERROR?
            ()=>()=>{} : console.warn.bind(console, ...data);
  }

  _any(...data: any[]): any{
    return environment.production? ()=>()=>{} : console.info.bind(console, ...data);
  }
}


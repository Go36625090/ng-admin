/**
 * using strict
 */

import {Inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Writer} from "../log/writer";
import {Log, LOG_WRITER} from "../log";
import {Level} from "../log/level";
import {AppConfig} from "../app.config";

@Injectable({
  providedIn: 'root',
  deps: [AppConfig]
})
export class LoggingService {
  private readonly config: any;
  constructor(@Inject(LOG_WRITER)private writer: Writer,
              private appConfig: AppConfig) {
    this.config = appConfig.config;
  }

  bind(target: any): Log{
    Object.defineProperty(this, "info", {
      get:  this._bind(Level.INFO, target )
    });

    Object.defineProperty(this, "warn", {
      get: this._bind(Level.WARN, target )
    });

    Object.defineProperty(this, "error", {
      get: this._bind(Level.ERROR, target )
    });

    Object.defineProperty(this, "debug", {
      get: this._bind(Level.DEBUG, target )
    });

    Object.defineProperty(this, "trace", {
      get: this._bind(Level.TRACE, target )
    });
    // @ts-ignore
    return this;
  }

  private _bind(level: Level, target: any): any{
    let obj: any = () => ()=>{}
    let args: any[] = [];
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
    }
    return obj
  }

  _info(...data: any[]): any{
    if (this.config.level == Level.DEBUG || this.config.level == Level.INFO || this.config.level == Level.TRACE){
      this.writer.write(...data);
    }
    const other_level = this.config.level != Level.DEBUG && this.config.level != Level.INFO && this.config.level != Level.TRACE;

    return environment.production || other_level ? ()=>()=>{}: console.info.bind(console, ...data);
  }

  _error(...data: any[]): any{
    this.writer.write(...data);
    return environment.production? ()=>()=>{}: console.error.bind(console, ...data);
  }

  _debug(...data: any[]): any{
    if (this.config.level == Level.DEBUG){
      this.writer.write(...data);
    }

    return environment.production || this.config.level != Level.DEBUG? ()=>()=>{} :console.debug.bind(console, ...data);
  }

  _trace(...data: any[]): any{
    if (this.config.level == Level.TRACE){
      this.writer.write(...data);
    }
    return environment.production|| this.config.level != Level.TRACE? ()=>()=>{} : console.trace.bind(console, ...data);
  }

  _warn(...data: any[]): any{
    if (this.config.level == Level.WARN || this.config.level == Level.INFO){
      this.writer.write(...data);
    }
    return environment.production? ()=>()=>{} : console.warn.bind(console, ...data);
  }
}


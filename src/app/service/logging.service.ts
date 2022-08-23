/**
 * using strict
 */

import {Inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Writer} from "../log/writer";
import {Log, LOG_WRITER} from "../log";
@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(@Inject(LOG_WRITER)private writer: Writer) {
  }

  bind(target: any): Log{
    Object.defineProperty(this, "info", {
      get: ()=>environment.production? ()=>()=>{}
        :this._info.bind(this, '['+Math.floor(Date.now()/1000)+']','[INFO]', `[${target.constructor.name}]`)
    });
    Object.defineProperty(this, "warn", {
      get: ()=>environment.production? ()=>()=>{}
        :this._warn.bind(this, '['+Math.floor(Date.now()/1000)+']','[WARN]', `[${target.constructor.name}]`)
    });

    Object.defineProperty(this, "error", {
      get: ()=> environment.production? ()=>()=>{}
        :this._error.bind(this, '['+Math.floor(Date.now()/1000)+']', '[ERROR]', `[${target.constructor.name}]`)
    });

    Object.defineProperty(this, "debug", {
      get: ()=>environment.production? ()=>()=>{}
        :this._debug.bind(this, '['+Math.floor(Date.now()/1000)+']','[DEBUG]', `[${target.constructor.name}]`)
    });
    Object.defineProperty(this, "trace", {
      get: ()=>environment.production? ()=>()=>{}
        :this._trace.bind(this, '['+Math.floor(Date.now()/1000)+']','[TRACE]', `[${target.constructor.name}]`)
    });

    // @ts-ignore
    return this;
  }

  _info(...data: any[]): any{
    this.writer.write(...data);
    return console.info.bind(console, ...data);
  }

  _error(...data: any[]): any{
    this.writer.write(...data);
    return console.error.bind(console, ...data);
  }

  _debug(...data: any[]): any{
    this.writer.write(...data);
    return console.debug.bind(console, ...data);
  }

  _trace(...data: any[]): any{
    this.writer.write(...data);
    return console.trace.bind(console, ...data);
  }

  _warn(...data: any[]): any{
    this.writer.write(...data);
    return console.warn.bind(console, ...data);
  }
}


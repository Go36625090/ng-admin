import {InjectionToken} from "@angular/core";
import {Writer} from "./writer";

export interface Log {
  info(...data: any[]): any;
  warn(...data: any[]): any;
  error(...data: any[]): any;
  debug(...data: any[]): any;
  trace(...data: any[]): any;
}

export const LOG_WRITER = new InjectionToken<Writer>('LOG_WRITER');

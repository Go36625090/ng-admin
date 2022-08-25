import {InjectionToken} from "@angular/core";
import {Level} from "./level";

export interface Log {
  info(...data: any[]): void;
  warn(...data: any[]): void;
  error(...data: any[]): void;
  debug(...data: any[]): void;
  trace(...data: any[]): void;
}

export const LOG_LEVEL= new InjectionToken<Level>('LOG_LEVEL');

export const LOG_LEVEL_PROVIDER = {provide: LOG_LEVEL, useValue: Level.DEBUG}

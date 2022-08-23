import {InjectionToken} from "@angular/core";
import {Writer} from "./writer";
import {Level} from "./level";

export interface Log {
  info(...data: any[]): void;
  warn(...data: any[]): void;
  error(...data: any[]): void;
  debug(...data: any[]): void;
  trace(...data: any[]): void;
}

export interface LogConfig {
    level: Level
    report_url: string
    use_writer: boolean
}

export const LOG_WRITER= new InjectionToken<Writer>('LOG_WRITER');

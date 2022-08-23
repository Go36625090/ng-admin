import {Injectable} from "@angular/core";

export interface Writer {
  write(...data: any[]):void;
}


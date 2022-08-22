import {InjectionToken} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {APIResponse} from "./response";

export interface  APIService {
  get(path: string,  headers?: HttpHeaders): Observable<APIResponse>;
  post(path: string, body: object|undefined|null, headers?: HttpHeaders): Observable<APIResponse>;
}

export const  API_SERVICE = new InjectionToken<APIService>('API_SERVICE');

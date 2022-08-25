import {Injectable, SkipSelf} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private _token: string | undefined;
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  getToken(): string {
    return <string>this._token;
  }

  setToken(value: string) {
    this._token = value;
    this.storage.setItem('token', value);
  }

  getAuthorizationToken(): string {
    return "";
  }

  remove() {

  }

  removeAuthorizationToken() {

  }
}

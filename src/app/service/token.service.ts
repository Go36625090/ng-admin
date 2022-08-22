import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private _token: string | undefined;

  get token(): string {
    return <string>this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  getAuthorizationToken(): string {
    return "";
  }

  remove() {

  }

  removeAuthorizationToken() {

  }
}

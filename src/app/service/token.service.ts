import {Injectable} from "@angular/core";
import {CacheService} from "../common/cache/cache.service";


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public readonly tokenKey = '__token__';
  constructor(private cache:CacheService) {
  }

  getToken(): string {
    return <string>this.cache.get(this.tokenKey);
  }

  setToken(value: string) {
    this.cache.set(this.tokenKey, value);
  }

  removeToken() {
    this.cache.remove(this.tokenKey);
  }

}

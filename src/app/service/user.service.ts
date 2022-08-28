import {Inject, Injectable} from '@angular/core';
import {TokenService} from "./token.service";
import {LOGIN_ENDPOINT} from "../consts";
import {LogService} from "../common/log/log.service";
import {API_SERVICE, APIService} from "../common/api";
import {Log} from "../common/log";
import {Level} from "../common/log/level";
import {REPORTER} from "../common/reporter";
import {Reporter} from "../common/reporter/reporter";
import {API} from "../common/api/types";
import {UserInfo} from "../models/user.info";
import {Menu} from "../models/menu";
import {Urls} from "../consts/urls";
import {CacheService} from "../common/cache/cache.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private log: Log;
  private user: UserInfo | undefined | null;
  public readonly userInfoKey = '__user_info__';

  constructor(
    @Inject(API_SERVICE) private api: APIService,
    private tokenService: TokenService,
    private cache: CacheService,
    @Inject(LOGIN_ENDPOINT) private loginUrl: string,
    @Inject(REPORTER) private reporter: Reporter,
    private logging: LogService) {
    this.log = this.logging.bind(this);
  }

  logout() {
    this.cache.clear();
    location.replace(Urls.LOGIN_URL);
  }

  login(body: any) {
    this.api.post<UserInfo>({pattern: 'user.account.login'}, body)
      .subscribe({
        next: (v: API.response<UserInfo>) => {
          this.user = v.content;
          this.tokenService.setToken(v.content.token);
          this.cache.set(this.userInfoKey, this.user);
          location.replace(Urls.HOME_URL);
        },
        error: (err: { message: any; }) => {
          this.reporter.write(Level.ERROR, 'user.account.login', err.message);
          this.cache.clear();
        }
      })
  }

  getUser(): UserInfo{
    if(!this.user){
      this.user = this.cache.get(this.userInfoKey);
    }

    return this.user as UserInfo
  }

  fetchMenus():Menu[][]{
    const user = this.getUser();
    if(user)
      return user.menus;
    return [];
  }

}

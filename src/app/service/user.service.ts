import {Inject, Injectable} from '@angular/core';
import {TokenService} from "./token.service";
import {LogService} from "../common/log/log.service";
import {API_SERVICE, APIService} from "../common/api";
import {Log} from "../common/log";
import {Level} from "../common/log/level";
import {REPORTER} from "../common/reporter";
import {Reporter} from "../common/reporter/reporter";
import {API} from "../common/api/types";
import {UserInfo} from "../models/user.info";
import {Menu} from "../models/menu";
import {CacheService} from "../common/cache/cache.service";
import {RouterService} from "./router.service";
import {Methods} from "../consts/method"
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private log: Log;
  private user: UserInfo | undefined | null;
  public readonly userInfoKey = '__user_info__';

  constructor(
    private rs: RouterService,
    private message: NzMessageService,
    @Inject(API_SERVICE) private api: APIService,
    private tokenService: TokenService,
    private cache: CacheService,
    @Inject(REPORTER) private reporter: Reporter,
    private logging: LogService) {
    this.log = this.logging.bind(this);
  }

  logout() {
    this.cache.clear();
    this.rs.jumpToLogin()
  }

  login(body: any) {
    this.api.post<UserInfo>({method: Methods.LOGIN}, body)
      .subscribe({
        next: (v: API.response<UserInfo>) => {
          if (v.code != 0){
            this.reporter.write(Level.ERROR, Methods.LOGIN, v.message);
            return;
          }
          this.user = v.content;
          this.tokenService.setToken(v.content.token);
          this.cache.set(this.userInfoKey, this.user);
          this.rs.jumpToHome();
        },
        error: (err: { message: any; }) => {
          this.reporter.write(Level.ERROR, Methods.LOGIN, err.message);
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

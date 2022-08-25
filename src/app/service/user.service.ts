import {EventEmitter, Inject, Injectable} from '@angular/core';
import {TokenService} from "./token.service";
import {LOGIN_ENDPOINT} from "../consts";
import {ActivatedRoute, Router} from "@angular/router";
import {LogService} from "../log/log.service";
import {API_SERVICE, APIService} from "../providers/api";
import {Log} from "../log";
import {Level} from "../log/level";
import {REPORTER} from "../providers/reporter";
import {Reporter} from "../providers/reporter/reporter";
import {API} from "../providers/api/types";
import {UserInfo} from "../models/user.info";
import {CacheService} from "../providers/cache/cache.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private log: Log;
  private user: UserInfo | undefined | null;
  public readonly userInfoKey = '__user_info__';
  localeEvent$: EventEmitter<string>

  constructor(
    @Inject(API_SERVICE) private api: APIService,
    private tokenService: TokenService,
    private cache: CacheService,
    @Inject(LOGIN_ENDPOINT) private loginUrl: string,
    @Inject(REPORTER) private reporter: Reporter,
    private logging: LogService,
    private router: Router, private route: ActivatedRoute) {
    this.log = this.logging.bind(this);
    this.localeEvent$ = new EventEmitter<string>();
  }

  logout() {
    this.cache.clear();
    this.router.navigateByUrl('/user/login',
      {skipLocationChange: false}).catch(e => alert(e));
  }

  login(body: any) {
    this.api.post<UserInfo>({pattern: 'user.account.login'}, body)
      .subscribe({
        next: (v: API.response<UserInfo>) => {
          this.user = v.content;
          this.tokenService.setToken(v.content.token);
          this.cache.set(this.userInfoKey, this.user);
          this.router.navigateByUrl('/', {skipLocationChange: false})
            .then();
        },
        error: err => {
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
}

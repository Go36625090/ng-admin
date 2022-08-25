import {Inject, Injectable} from '@angular/core';
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
import {LoginResponse} from "../models/login.response";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private log: Log;
  private loginInfo: LoginResponse|undefined;

  constructor(
    @Inject(API_SERVICE) private api: APIService,
    private tokenService: TokenService,
    @Inject(LOGIN_ENDPOINT) private loginUrl: string,
    @Inject(REPORTER) private reporter: Reporter,
    private logging: LogService,
    private router: Router, private route: ActivatedRoute) {
    this.log = this.logging.bind(this);
  }

  logout() {
    this.tokenService.removeAuthorizationToken();
    this.router.navigateByUrl('/user/login',
      {skipLocationChange: false}).catch(e => alert(e));
  }

  login(body: any) {
    this.api.post<LoginResponse>({pattern: 'user.account.login'}, body)
      .subscribe({
        next: (v: API.response<LoginResponse>) => {
          console.log(v)
          this.loginInfo = v.content;
          this.tokenService.setToken(v.content.token);
          this.router.navigateByUrl('/', {skipLocationChange: false})
            .then();
        },
        error: err => this.reporter.write(Level.ERROR, 'user.account.login', err.message)
      })
  }

}

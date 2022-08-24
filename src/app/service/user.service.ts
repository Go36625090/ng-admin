import {Inject, Injectable} from '@angular/core';
import {TokenService} from "./token.service";
import {LOGIN_ENDPOINT} from "../consts";
import {ActivatedRoute, Router} from "@angular/router";
import {APIResponse} from "../providers/api/response";
import {LoggingService} from "../log/logging.service";
import {API_SERVICE, APIService} from "../providers/api";
import {Log} from "../log";
import {Level} from "../log/level";
import {REPORTER} from "../providers/reporter";
import {Reporter} from "../providers/reporter/reporter";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private log: Log;
  private heroesUrl = '/turbo-trader/api/users';  // URL to web api
  constructor(
    @Inject(API_SERVICE) private api: APIService,
    private tokenService: TokenService,
    @Inject(LOGIN_ENDPOINT) private loginUrl: string,
    @Inject(REPORTER) private reporter: Reporter,
    private logging: LoggingService,
    private router: Router, private route: ActivatedRoute) {
    this.log = this.logging.bind(this);
  }

  logout() {
    this.tokenService.removeAuthorizationToken();
    this.router.navigateByUrl('/user/login',
      {skipLocationChange: false}).catch(e => alert(e));
  }

  login() {
    this.api.post({name: 'user.account.logian'}, {})
      .subscribe({
        next: (v: APIResponse) => {
          this.reporter.write(Level.INFO, 'user.account.logian', v);
          this.router.navigateByUrl('/', {skipLocationChange: false})
            .then();

        },
        error: err => this.reporter.write(Level.ERROR, 'user.account.logian', err.message)
      })
  }


}

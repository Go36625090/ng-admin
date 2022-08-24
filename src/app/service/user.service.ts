import {Inject, Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {TokenService} from "./token.service";
import {HttpClient} from "@angular/common/http";
import {LOGIN_URL} from "../consts";
import {ActivatedRoute, Router} from "@angular/router";
import {APIResponse} from "../api/response";
import {LoggingService} from "./logging.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private log: Log;
  private heroesUrl = '/turbo-trader/api/users';  // URL to web api
  constructor(private api: ApiService, private tokenService: TokenService,
              private http: HttpClient, @Inject(LOGIN_URL) private loginUrl: string,
              private logging: LoggingService,
              private router: Router, private route: ActivatedRoute) {
    // this.log = this.logging.bind(this);
  }

  logout(){
    this.tokenService.removeAuthorizationToken();
    this.router.navigateByUrl('/user/login' ,
      { skipLocationChange: false } ).then(r => console.info(r));
  }

  login(){
    this.api.get('/login').subscribe({
      next: (v: APIResponse) => {
        this.router.navigateByUrl('/' ,
          { skipLocationChange: false } ).then(r => console.log(r));
      },
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
    })
  }


}

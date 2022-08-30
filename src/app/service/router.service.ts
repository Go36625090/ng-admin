import {Inject, Injectable} from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";
import {Urls} from "../consts/urls";

/**
 * 统一路由跳转管理
 */
@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor() {

  }

  isLoginRouter(): boolean{
    return location.pathname.endsWith(Urls.LOGIN_URL)
  }

  jumpToLogin(){
    location.replace( Urls.LOGIN_URL);
  }

  jumpToHome(){
    location.replace(  Urls.HOME_URL);
  }

}

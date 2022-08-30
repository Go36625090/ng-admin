import {
  AfterViewInit,
  APP_INITIALIZER,
  ApplicationInitStatus,
  Component,
  Inject,
  OnInit, SkipSelf,
  ViewChild
} from '@angular/core';
import {ThemeService} from "./service/theme.service";
import {NzI18nService} from 'ng-zorro-antd/i18n';
import {NzIconService} from "ng-zorro-antd/icon";
import {UserService} from "./service/user.service";
import {LogService} from "./common/log/log.service";
import {NavigationEnd,  Router} from "@angular/router";
import {TokenService} from "./service/token.service";
import {AppContainerDirective} from "./app.container.directive";
import {AppContainerComponent} from "./app.container.component";
import {Urls} from "./consts/urls";
import {AppBlankComponent} from "./app.blank.component";
import {RouterService} from "./service/router.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  isCollapsed = false;
  initialized = false;
  @ViewChild(AppContainerDirective, {static: true}) appContainerDirective!: AppContainerDirective;

  constructor(
    private rs: RouterService,
    private tokenService: TokenService,
    public router: Router) {

    /**
     * 判断用户是否登录，然后跳转到登录页
     */
    this.router.events.subscribe(evt => {
      if(evt instanceof NavigationEnd){
        if(!rs.isLoginRouter() && !this.tokenService.getToken()){
          this.loadAppBlankComponent()
          rs.jumpToLogin();
          return;
        }else {
          if(!this.initialized)
            this.loadContentComponent();
          this.initialized = true;
        }
      }
    })
  }

  loadAppBlankComponent(){
    const viewContainerRef = this.appContainerDirective.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<AppBlankComponent>(AppBlankComponent);
  }

  loadContentComponent(){
    const viewContainerRef = this.appContainerDirective.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<AppContainerComponent>(AppContainerComponent);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }


}

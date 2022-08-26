import {APP_INITIALIZER, ApplicationInitStatus, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ThemeService} from "./service/theme.service";
import {en_US, zh_CN, NzI18nService} from 'ng-zorro-antd/i18n';
import {NzIconService} from "ng-zorro-antd/icon";
import {UserService} from "./service/user.service";
import {LogService} from "./log/log.service";
import {ActivatedRoute, ResolveStart, Router} from "@angular/router";
import {TokenService} from "./service/token.service";
import {Subject} from "rxjs";
import {AppContainerDirective} from "./app.container.directive";
import {AppContainerComponent} from "./app.container.component";
import {LoginComponent} from "./pages/user/login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  initialized = false;
  @ViewChild(AppContainerDirective, {static: true}) appContainerDirective!: AppContainerDirective;

  constructor(
    @Inject(APP_INITIALIZER) public appInit: ApplicationInitStatus,
    private themeService: ThemeService,
    private i18n: NzI18nService,
    private iconService: NzIconService,
    private userService: UserService,
    private logging: LogService,
    private tokenService: TokenService,
    public router: Router) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'assets/scripts/icon-svg.js'
    });

    this.router.events.subscribe(evt => {
      if(!location.pathname.endsWith('/login') && !this.tokenService.getToken()){
        location.replace('/login')
        return;
      }
      this.loadContentComponent();
    })
  }

  loadLoginComponent(){
    const viewContainerRef = this.appContainerDirective.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<LoginComponent>(LoginComponent);
  }

  loadContentComponent(){
    const viewContainerRef = this.appContainerDirective.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<AppContainerComponent>(AppContainerComponent);
  }

  ngOnInit(): void {
  }


}

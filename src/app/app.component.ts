import {
  AfterViewInit,
  APP_INITIALIZER,
  ApplicationInitStatus,
  Component,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {ThemeService} from "./service/theme.service";
import {NzI18nService} from 'ng-zorro-antd/i18n';
import {NzIconService} from "ng-zorro-antd/icon";
import {UserService} from "./service/user.service";
import {LogService} from "./common/log/log.service";
import {NavigationEnd, ResolveEnd, ResolveStart, Router} from "@angular/router";
import {TokenService} from "./service/token.service";
import {AppContainerDirective} from "./app.container.directive";
import {AppContainerComponent} from "./app.container.component";
import {LoginComponent} from "./pages/user/login/login.component";
import {Urls} from "./consts/urls";
import {AppBlankComponent} from "./app.blank.component";

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
    @Inject(APP_INITIALIZER) public appInit: ApplicationInitStatus,
    private themeService: ThemeService,
    private i18n: NzI18nService,
    private iconService: NzIconService,
    private userService: UserService,
    private logging: LogService,
    private tokenService: TokenService,
    public router: Router) {
    console.log('init app')
    this.router.events.subscribe(evt => {
      if(evt instanceof NavigationEnd){
        if(!location.pathname.endsWith(Urls.LOGIN_URL) && !this.tokenService.getToken()){
          this.loadAppBlankComponent()
          location.replace(Urls.LOGIN_URL);
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
    console.log('loadContentComponent')
    const viewContainerRef = this.appContainerDirective.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<AppContainerComponent>(AppContainerComponent);
  }

  ngOnInit(): void {
    console.log('init ngOnInit')
  }

  ngAfterViewInit(): void {
    console.log('init ngAfterViewInit')
  }


}

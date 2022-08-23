import {APP_INITIALIZER, ApplicationInitStatus, Component, Inject} from '@angular/core';
import {ThemeService} from "./service/theme.service";
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd/i18n';
import {NzIconService} from "ng-zorro-antd/icon";
import {UserService} from "./service/user.service";
import {LoggingService} from "./service/logging.service";
import {LoginComponent} from "./pages/user/login/login.component";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {Subject} from "rxjs";
import {AsyncPipe} from "@angular/common";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  singlePage = true;
  constructor(
    @Inject(APP_INITIALIZER) public appInit: ApplicationInitStatus,
    private themeService: ThemeService,
              private i18n: NzI18nService,
              private iconService: NzIconService,
              private userService: UserService,
              private logging: LoggingService,
              private router: ActivatedRoute) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'assets/scripts/icon-svg.js'
    });
    this.singlePage = (router.outlet != 'primary');
  }
  logout(){
    this.userService.logout();
  }

  switchLanguage(id: string) {
    if (id == 'zh_CN'){
      this.i18n.setLocale(zh_CN);
    }else{
      this.i18n.setLocale(en_US);
    }
  }
  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }

  updateMenuInlineCollapsed(e: any): void{
    console.log(e);
    this.isCollapsed = e;
  }

  log(s: string): void {
  }

  visible = false;
  size: 'large' | 'default' = 'default';

  get title(): string {
    return `${this.size} Drawer`;
  }

  showDefault(): void {
    this.size = 'default';
    this.open();
  }

  showLarge(): void {
    this.size = 'large';
    this.open();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  onActivate($event: any) {
    console.log()
  }

  onDeactivate($event: any) {

  }

  onAttach($event: any) {
  }

  onDetach($event: any) {

  }

}

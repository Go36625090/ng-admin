import { Component, OnInit } from '@angular/core';
import {en_US, NzI18nService, zh_CN} from "ng-zorro-antd/i18n";
import {ThemeService} from "../../service/theme.service";
import {NzIconService} from "ng-zorro-antd/icon";
import {UserService} from "../../service/user.service";
import {LogService} from "../../log/log.service";
import {ActivatedRoute} from "@angular/router";
import {I18nService} from "../../service/i18n.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private themeService: ThemeService,
              public i18n: I18nService,
              private iconService: NzIconService,
              private userService: UserService,
              private logging: LogService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
  }
  logout(){
    this.userService.logout();
  }

  // switchLanguage(id: string) {
  //   if (id == 'zh_CN'){
  //     this.i18n.setLocale(zh_CN);
  //     this.userService.localeEvent$.emit('zh');
  //   }else{
  //     this.i18n.setLocale(en_US);
  //     this.userService.localeEvent$.emit('en');
  //   }
  //
  // }

  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }

  log(s: string): void {
  }

}

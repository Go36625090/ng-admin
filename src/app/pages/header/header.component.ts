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
              private i18n: I18nService,
              private userService: UserService) { }

  ngOnInit(): void {
  }
  logout(){
    this.userService.logout();
  }

  switchLanguage(id: string){
    this.i18n.switchLanguage(id)
  }


  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }


}

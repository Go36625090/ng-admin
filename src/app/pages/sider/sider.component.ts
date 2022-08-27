import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {UserInfo} from "../../models/user.info";
import {Subject} from "rxjs";
import {Menu} from "../../models/menu";
import {I18nService} from "../../service/i18n.service";

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css']
})
export class SiderComponent implements OnInit {
  isCollapsed = false;
  url: string = '';
  user: UserInfo | undefined;
  menus: Menu[][] = [];
  constructor(public route: ActivatedRoute,
              private userService: UserService,
              private i18nService: I18nService,
              @Inject(LOCALE_ID) public locale: string) {
    this.url = location.pathname;
    this.i18nService.localeEvent$.subscribe(locale=>this.locale = locale);
  }

  ngOnInit(): void {
    this.menus = this.userService.fetchMenus();
  }

  updateMenuInlineCollapsed(e: any): void{
    this.isCollapsed = e;
  }

  login(){
  }
}

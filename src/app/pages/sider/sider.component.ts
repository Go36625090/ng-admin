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
  constructor(private userService: UserService,
              private i18nService: I18nService) {
    this.url = location.pathname;
  }

  ngOnInit(): void {
    this.menus = this.userService.fetchMenus();
  }

  translateMenu(parent: string, child?: string|null){
    return this.i18nService.translateMenu(parent, child)
  }

  updateMenuInlineCollapsed(e: any): void{
    this.isCollapsed = e;
  }

  login(){
  }
}

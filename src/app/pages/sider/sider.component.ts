import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {UserInfo} from "../../models/user.info";
import {Subject} from "rxjs";
import {Menu} from "../../models/menu";

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css']
})
export class SiderComponent implements OnInit {
  isCollapsed = false;
  url: string = '';
  user: UserInfo | undefined;
  menus: Menu[][]|undefined;

  constructor(public route: ActivatedRoute,
              private userService: UserService,
              @Inject(LOCALE_ID) public locale: string) {
    this.url = location.pathname;
    this.userService.localeEvent$.subscribe(locale=>this.locale = locale);
  }

  ngOnInit(): void {
    const user = this.userService.getUser();
    if (user) {
      this.user = user;
      this.menus = user.menus;
    }
  }
  updateMenuInlineCollapsed(e: any): void{
    this.isCollapsed = e;
  }

  login(){
  }
}

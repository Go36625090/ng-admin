import {Component,  OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserInfo} from "../../models/user.info";
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
  menus: Menu[][] = [];
  constructor(private userService: UserService) {
    this.url = location.pathname;
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

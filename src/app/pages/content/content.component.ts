import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserInfo} from "../../models/user.info";
import {Menu} from "../../models/menu";
import {ResolveEnd, Router} from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  user: UserInfo | undefined;
  menus: Menu[][]|undefined;
  breadcrumb: {parent: string, child: string} = {
    parent: '',
    child: ''
  };
  constructor(private userService: UserService,
              public router: Router,
              @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit(): void {
    const user = this.userService.getUser();
    if (user) {
      this.user = user;
      this.menus = user.menus;
    }
    this.router.events.subscribe(evt=> {
      if(evt instanceof  ResolveEnd ) {
        const paths = evt.state.url.split('/');
        this.breadcrumb.parent = paths[1];
        this.breadcrumb.child = paths[2]
      }
    });
  }


}

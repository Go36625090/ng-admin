import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css']
})
export class SiderComponent implements OnInit {
  isCollapsed = false;
  url: string = '';
  constructor(public route: ActivatedRoute) {
    this.url = location.pathname;
  }

  ngOnInit(): void {
  }
  updateMenuInlineCollapsed(e: any): void{
    this.isCollapsed = e;
  }
  login(){
  }
}

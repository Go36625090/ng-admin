import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css']
})
export class SiderComponent implements OnInit {
  isCollapsed = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  updateMenuInlineCollapsed(e: any): void{
    console.log(e);
    this.isCollapsed = e;
  }
  login(){
    this.route.component
  }
}

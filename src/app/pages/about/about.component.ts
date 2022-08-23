import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";
import {UserService} from "../../service/user.service";
import {AsyncPipe} from "@angular/common";
import {of} from "rxjs";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [AsyncPipe]
})
export class AboutComponent implements OnInit {
  public about: any;
  public curr: any;
  constructor(private api: ApiService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe((heroes: any) => heroes);
    this.about = of(1,2,3);
    this.curr = new Date();
  }
}

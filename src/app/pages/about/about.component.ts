import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private api: ApiService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe((heroes: any) => heroes);
  }
}

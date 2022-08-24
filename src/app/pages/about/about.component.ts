import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public about: any;
  public curr: any;
  constructor(private api: ApiService, private userService: UserService) { }

  ngOnInit(): void {

  }
}

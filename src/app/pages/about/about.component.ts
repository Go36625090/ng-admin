import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {API_SERVICE, APIService} from "../../providers/api";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public about: any;
  public curr: any;
  constructor(@Inject(API_SERVICE) private api: APIService, private userService: UserService) { }

  ngOnInit(): void {

  }
}

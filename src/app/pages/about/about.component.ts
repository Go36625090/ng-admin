import {Component, Inject, OnInit} from '@angular/core';
import {API_SERVICE, APIService} from "../../common/api";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public about: any;
  public curr: any;
  constructor(@Inject(API_SERVICE) private api: APIService) { }

  ngOnInit(): void {
    this.api.post({method: 'app.info.about'}, null).subscribe()
  }
}

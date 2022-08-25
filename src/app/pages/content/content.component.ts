import { Component, OnInit } from '@angular/core';
import {LogService} from "../../log/log.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private logging: LogService) { }

  ngOnInit(): void {
  }

  onActivate($event: any) {
  }

  onDeactivate($event: any) {
  }

  onAttach($event: any) {
  }

  onDetach($event: any) {

  }

}

import { Component, OnInit } from '@angular/core';
import {LoggingService} from "../../service/logging.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private logging: LoggingService) { }

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

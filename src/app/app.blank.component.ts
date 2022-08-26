import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blank',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class AppBlankComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  width = 60;
  title: string  = "";
  updateMenuInlineCollapsed(e: any): void{
    console.log(e);
    this.isCollapsed = e;
  }

  log(s: string): void {
    console.log('click dropdown button');
  }
}

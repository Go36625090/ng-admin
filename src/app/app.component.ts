import { Component } from '@angular/core';
import {ThemeService} from "./theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  width = 60;
  title: string  = "";

  constructor(private themeService: ThemeService) {
  }
  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }
  updateMenuInlineCollapsed(e: any): void{
    console.log(e);
    this.isCollapsed = e;
  }

  log(s: string): void {
    console.log('click dropdown button');
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

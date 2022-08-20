import { Component } from '@angular/core';
import {ThemeService} from "./theme.service";
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd/i18n';
import {NzIconService} from "ng-zorro-antd/icon";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  width = 60;

  constructor(private themeService: ThemeService, private i18n: NzI18nService,
              private iconService: NzIconService) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'assets/scripts/icon-svg.js'
    });
  }

  switchLanguage(id: string) {
    if (id == 'zh_CN'){
      this.i18n.setLocale(zh_CN);
    }else{
      this.i18n.setLocale(en_US);
    }
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

  visible = false;
  size: 'large' | 'default' = 'default';

  get title(): string {
    return `${this.size} Drawer`;
  }

  showDefault(): void {
    this.size = 'default';
    this.open();
  }

  showLarge(): void {
    this.size = 'large';
    this.open();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

}

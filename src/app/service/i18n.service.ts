import {EventEmitter, Inject, Injectable, LOCALE_ID, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Menu} from "../models/menu";
import {UserService} from "./user.service";
import {CacheService} from "../providers/cache/cache.service";
import {en_US, NzI18nService, zh_CN} from "ng-zorro-antd/i18n";

@Injectable({
  providedIn: 'root'
})
export class I18nService implements OnInit{
  menus: Menu[][]|undefined;
  readonly localeEvent$: EventEmitter<string>

  constructor(private httpClient:HttpClient,
              private nzI18n: NzI18nService,
              private cacheService: CacheService,
              private userService: UserService,
              @Inject(LOCALE_ID) public locale: string) {
    this.localeEvent$ = new EventEmitter<string>();
    this.localeEvent$.subscribe(locale=>this.locale = locale);
  }

  ngOnInit(): void {
    this.menus = this.userService.fetchMenus();
  }

  switchLanguage(id: string) {
    if (id == 'zh_CN'){
      this.nzI18n.setLocale(zh_CN);
      this.localeEvent$.emit('zh');
    }else{
      this.nzI18n.setLocale(en_US);
      this.localeEvent$.emit('en');
    }

  }
  /**
   *
   * @param parent
   * @param child
   */
  translateMenu(parent: string, child: string|null): string{
    this.menus = this.userService.fetchMenus();
    if(!this.menus){
      return child?child:parent;
    }
    let menus = this.menus.find(g=>g.find(m=>m.pattern==parent));
    if(!menus){
      return child?child:parent;
    }
    const menu = menus.find(m=>m.pattern==parent);
    if(!child){
      if(menu){
        return menu.i18nNames[this.locale];
      }
    }
    if(menu && menu.submenus){
      const sub = menu.submenus.find(m=>m.pattern==child);
      if(sub){
        return sub.i18nNames[this.locale];
      }
    }
    return child?child:parent;
  }

}

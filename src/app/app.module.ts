import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzListModule} from "ng-zorro-antd/list";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import { AboutComponent } from './pages/about/about.component';
import {NzDrawerModule} from "ng-zorro-antd/drawer";

/** 配置 ng-zorro-antd 国际化 **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
registerLocaleData(en);
registerLocaleData(zh);

import {en_US, NZ_I18N, zh_CN } from "ng-zorro-antd/i18n";
const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  message: { nzTop: 120 },
  notification: { nzTop: 240 },
  // icon: { nzTheme: 'twotone' },
};

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzDividerModule,
    NzButtonModule,
    NzDropDownModule,
    NzListModule,
    NzToolTipModule,
    NzDrawerModule,
    // NoopAnimationsModule,
  ],
  providers: [
    { provide: NZ_CONFIG, useValue:  ngZorroConfig  },
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          /** 与 angular.json i18n/locales 配置一致 **/
          case 'zh':
            return zh_CN;
          default:
            return en_US;
        }
      },
      deps: [LOCALE_ID]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

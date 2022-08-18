import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzBreadcrumb} from "ng-zorro-antd/breadcrumb/breadcrumb";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import {NZ_WAVE_GLOBAL_CONFIG} from "ng-zorro-antd/core/wave";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzListModule} from "ng-zorro-antd/list";
registerLocaleData(zh);
const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  theme: {
    primaryColor: '#1890ff'
  }
};
@NgModule({
  declarations: [
    AppComponent
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
    // NoopAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_CONFIG, useValue:  ngZorroConfig  },
    {
      provide: NZ_WAVE_GLOBAL_CONFIG, useValue: {
        disabled: false,
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

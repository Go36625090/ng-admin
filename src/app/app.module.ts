import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzListModule} from "ng-zorro-antd/list";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {AboutComponent} from './pages/about/about.component';
import {NzDrawerModule} from "ng-zorro-antd/drawer";

import {HeaderComponent} from "./pages/header/header.component";
import { SiderComponent } from './pages/sider/sider.component';
import { ContentComponent } from './pages/content/content.component';
import { MockWebApiModule } from "./mock";

import {
  API_SERVICE_PROVIDER,
  HTTP_INTERCEPTOR_PROVIDERS, LOG_WRITER_PROVIDER,
  LOGIN_URL_PROVIDER
} from "./app.provider";

import {NZ_CONFIG_PROVIDER} from "./app.config";
import {LOCALE_PROVIDER} from "./app.locale";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    SiderComponent,
    ContentComponent,
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
    MockWebApiModule,
  ],
  providers: [
    API_SERVICE_PROVIDER,
    LOGIN_URL_PROVIDER,
    HTTP_INTERCEPTOR_PROVIDERS,
    NZ_CONFIG_PROVIDER,
    LOCALE_PROVIDER,
    LOG_WRITER_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

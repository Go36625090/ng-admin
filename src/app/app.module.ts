import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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

import {
  HTTP_INTERCEPTOR_PROVIDERS,
  LOGIN_URL_PROVIDER
} from "./app.provider";

import {CONFIG_PROVIDER, NZ_CONFIG_PROVIDER} from "./app.config";
import {LOCALE_PROVIDER} from "./app.locale";
import {CommonModule} from "@angular/common";
import {REPORTER_PROVIDER} from "./providers/reporter";
import {LOG_LEVEL_PROVIDER} from "./log";
import {API_SERVICE_PROVIDER, MockWebApiModule} from "./providers/api";
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/errors/page.not.found.component';
import {IconModule} from "@ant-design/icons-angular";
import {LoginComponent} from "./pages/user/login/login.component";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import { AppContainerDirective } from './app.container.directive';
import { AppContainerComponent } from './app.container.component';
import { AppBlankComponent } from './app.blank.component';
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzResultModule} from "ng-zorro-antd/result";
import {NzTableModule} from "ng-zorro-antd/table";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    SiderComponent,
    ContentComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    AppContainerDirective,
    AppContainerComponent,
    AppBlankComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({appId: 'jewellery'}),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    IconModule,
    NzInputModule,
    NzCheckboxModule,
    NzPaginationModule,
    NzResultModule,
    NzTableModule,
  ],
  providers: [
    CONFIG_PROVIDER,
    API_SERVICE_PROVIDER,
    LOGIN_URL_PROVIDER,
    HTTP_INTERCEPTOR_PROVIDERS,
    NZ_CONFIG_PROVIDER,
    LOCALE_PROVIDER,
    LOG_LEVEL_PROVIDER,
    REPORTER_PROVIDER,
  ],
  bootstrap: [AppComponent],
  exports: [CommonModule]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { MenuComponent } from './menu/menu.component';
import { PermissionComponent } from './permission/permission.component';
import {DashboardModule} from "../dashboard/dashboard.module";
import {TableGridModule} from "../../common/table.grid/table.grid.module";


@NgModule({
  declarations: [
    MenuComponent,
    PermissionComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    DashboardModule,
    TableGridModule,
  ]
})
export class SettingModule { }

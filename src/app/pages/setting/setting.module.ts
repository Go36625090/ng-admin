import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { MenuComponent } from './menu/menu.component';
import { PermissionComponent } from './permission/permission.component';
import {DashboardModule} from "../dashboard/dashboard.module";
import {TableGridModule} from "../../common/table.grid/table.grid.module";
import {NzModalModule} from "ng-zorro-antd/modal";
import { MenuEditComponent } from './menu/menu.edit.component';

@NgModule({
  declarations: [
    MenuComponent,
    PermissionComponent,
    MenuEditComponent,
  ],
    imports: [
        CommonModule,
        SettingRoutingModule,
        DashboardModule,
        TableGridModule,
        NzModalModule,
    ]
})
export class SettingModule { }

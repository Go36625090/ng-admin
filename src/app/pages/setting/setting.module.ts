import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { MenuComponent } from './menu/menu.component';
import { PermissionComponent } from './permission/permission.component';


@NgModule({
  declarations: [
    MenuComponent,
    PermissionComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }

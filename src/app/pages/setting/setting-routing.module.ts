import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from "./menu/menu.component";
import {PermissionComponent} from "./permission/permission.component";

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'menu', component: MenuComponent,
      data: {
        breadcrumb: 'menu'
      }
    },
    {
      path: 'permission', component: PermissionComponent,
      data: {
        breadcrumb: 'permission'
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }

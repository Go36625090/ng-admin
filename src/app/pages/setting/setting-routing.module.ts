import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from "./menu/menu.component";
import {PermissionComponent} from "./permission/permission.component";

const routes: Routes = [{
  path: '',
  data: {
    name: 'setting'
  },
  children: [
    {
      path: 'menu', component: MenuComponent,
      data: {
        name: 'menu'
      }
    },
    {
      path: 'permission', component: PermissionComponent,
      data: {
        name: 'permission'
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {
}

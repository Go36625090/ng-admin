import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {CustomComponent} from "./custom/custom.component";

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'main', component: MainComponent,
      data: {
        name: 'main'
      }
    },
    {
      path: 'custom', component: CustomComponent,
      data: {
        name: 'custom'
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

}

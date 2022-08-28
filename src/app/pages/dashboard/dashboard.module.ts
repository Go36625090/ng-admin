import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { CustomComponent } from './custom/custom.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {TableGridModule} from "../../common/table.grid/table.grid.module";


@NgModule({
  declarations: [
    MainComponent,
    CustomComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzTableModule,
    TableGridModule,
  ],
  exports: [
  ]
})
export class DashboardModule { }

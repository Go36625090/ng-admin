import {NgModule,} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableGridComponent} from "./table.grid.component";
import {NzTableModule} from "ng-zorro-antd/table";
import {PipeModule} from "../pipe/pipe.module";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({

  declarations: [
    TableGridComponent,
  ],
  exports: [
    TableGridComponent,
  ],
  imports: [
    CommonModule,
    NzTableModule,
    PipeModule,
    NzModalModule,
    NzButtonModule,
  ]
})
export class TableGridModule {
}

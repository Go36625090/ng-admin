import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableGridComponent} from "./table.grid.component";
import {NzTableModule} from "ng-zorro-antd/table";
import {PipeModule} from "../pipe/pipe.module";


@NgModule({

  declarations: [
    TableGridComponent,
  ],
  exports: [
    TableGridComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    PipeModule,
  ]
})
export class TableGridModule {
}

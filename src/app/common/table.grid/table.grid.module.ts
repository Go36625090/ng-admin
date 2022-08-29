import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableGridComponent} from "./table.grid.component";
import {NzTableModule} from "ng-zorro-antd/table";
import {PipeModule} from "../pipe/pipe.module";
import {NzTagModule} from "ng-zorro-antd/tag";


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
export class TableGridModule { }

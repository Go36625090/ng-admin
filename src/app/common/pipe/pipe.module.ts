import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeepSafeHtmlPipe} from "./keep.safe.html.pipe";


@NgModule({
  declarations: [
    KeepSafeHtmlPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KeepSafeHtmlPipe,
  ]
})
export class PipeModule { }

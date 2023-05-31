import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';

import {WelcomeComponent} from './welcome.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormDirective, NzFormModule} from "ng-zorro-antd/form";
import {NzFormPatchModule} from "ng-zorro-antd/core/form";
import {FormGroupDirective, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzResultModule} from "ng-zorro-antd/result";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";


@NgModule({
  imports: [WelcomeRoutingModule, FormsModule, CommonModule,
    ReactiveFormsModule, NzButtonModule, NzFormModule,
    NzFormPatchModule, NzResultModule, NzCollapseModule,
    NzIconModule, NzPaginationModule, NzDividerModule, NzInputModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers: [NzFormDirective, FormGroupDirective]
})
export class WelcomeModule {

}

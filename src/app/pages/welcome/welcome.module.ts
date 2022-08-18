import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormDirective, NzFormModule} from "ng-zorro-antd/form";
import {NzFormPatchModule} from "ng-zorro-antd/core/form";
import {FormGroupDirective, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzResultModule} from "ng-zorro-antd/result";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  imports: [WelcomeRoutingModule, FormsModule,
    ReactiveFormsModule, NzButtonModule, NzFormModule,
    NzFormPatchModule, NzResultModule, NzCollapseModule,
    NzIconModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers: [NzFormDirective, FormGroupDirective]
})
export class WelcomeModule { }

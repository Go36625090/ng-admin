import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RowOperation, TableRowOperation} from "../../../common/table.grid/table.row.operation";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Menu} from "../../../models/menu";

@Component({
  selector: 'app-menu-edit',
  template: `
    <p>
      menu.edit works!
    <form nz-form [formGroup]="result" >
      <nz-form-item>
        <nz-form-label [nzSpan]="5" nzRequired nzFor="note">Note</nz-form-label>
        <nz-form-control [nzSpan]="12" nzErrorTip="Please input your username!">
          <input id="note" type="text" nz-input formControlName="note" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5" nzFor="gender" nzRequired>Gender</nz-form-label>
        <nz-form-control [nzSpan]="12" nzErrorTip="Please input your username!">
          <input id="gender" type="text" nz-input formControlName="gender" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: [
  ]
})
export class MenuEditComponent implements OnInit, RowOperation<Menu> {
  result: any
  constructor(private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.result = this.fb.group({
      note: [this.data.pattern, [Validators.required]],
      gender: [this.data.name, [Validators.required]]
    });
  }

  data!: Menu;

}

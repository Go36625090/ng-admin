import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RowOperation, TableRowOperation} from "../../../common/table.grid/table.row.operation";

@Component({
  selector: 'app-menu-edit',
  template: `
    <p>
      menu.edit works!
      {{data|json}}
    </p>
  `,
  styles: [
  ]
})
export class MenuEditComponent implements OnInit, RowOperation {

  constructor() { }

  ngOnInit(): void {}
  @Input() data: any;
}

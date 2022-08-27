import { Component, OnInit } from '@angular/core';
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {TableGridColumn} from "./index";

@Component({
  selector: 'app-table-grid',
  templateUrl: './table.grid.component.html',
  styleUrls: ['./table.grid.component.css']
})
export class TableGridComponent implements OnInit {
  columns: TableGridColumn[];
  onParamsChangeQueryEvent: ((arg0: NzTableQueryParams) => void) | undefined;
  data$: any;
  listOfRandomUser: any;
  constructor() { }

  ngOnInit(): void {
  }
  filterFn(ev)
}

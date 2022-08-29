import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {API_SERVICE, APIService} from "../../../common/api";
import {UserInfo} from "../../../models/user.info";
import {TableGridColumn, TableGridRowOperation} from "../../../common/table.grid/models";
import {TableGridComponent} from "../../../common/table.grid/table.grid.component";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css'],
})
export class CustomComponent implements OnInit {
  columns: TableGridColumn<any>[];
  operations: TableGridRowOperation[];
  data: any[];
  @ViewChild(TableGridComponent) table: TableGridComponent<any> | undefined;
  constructor( @Inject(API_SERVICE)private api:APIService) {
    this.data = [];
    this.columns = [
      {name: 'id', kind: 'id',},
      {name: 'name', kind: 'name',sort: true},
      {name: 'pattern', kind: 'pattern', filter: true}
    ];
    this.operations = [
      {
        name: '编辑',
        onClickEvent: this.clickDetail,
      },
      {
        name: '详情',
        onClickEvent: this.clickDetail,
      },
    ]
  }
  clickDetail(row: any){
    console.log(row);
  }
  ngOnInit(): void {

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.api.post<UserInfo>({pattern: 'user.account.login'}, {}).subscribe(
      value => this.table?.onDataChangeEvent$.next({
        content: value.content.menus.flat(),
        pagination: {
          size: params.pageSize,
          page: params.pageIndex,
          total: value.pagination?.total||value.content.menus.flat().length,
        }
      })
    );
  }

  onItemSelected(item: any){
    console.log('onItemSelected', item)
  }

  onItemDeselected(item: any){
    console.log('onItemDeselected', item)
  }

  onAllItemSelected(items: any[]) {
    console.log('onAllItemSelected', items)
  }
}

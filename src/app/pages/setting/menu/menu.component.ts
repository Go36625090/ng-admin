import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {TableGridColumn} from "../../../common/table.grid/models";
import {TableGridComponent} from "../../../common/table.grid/table.grid.component";
import {API_SERVICE, APIService} from "../../../common/api";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {UserInfo} from "../../../models/user.info";
import {MenuEditComponent} from "./menu.edit.component";
import {TableRowOperation} from "../../../common/table.grid/table.row.operation";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  columns: TableGridColumn<any>[];
  operations: TableRowOperation[];

  @ViewChild(TableGridComponent) table: TableGridComponent<any> | undefined;

  row: any = {};
  constructor( @Inject(API_SERVICE)private api:APIService) {

    this.columns = [
      {name: 'id', kind: 'id',},
      {name: $localize `name`, kind: 'name', sort: true},
      {name: $localize `pattern`, kind: 'pattern', filter: true, transformer:{
          apply(input: any): any {
            return '<a href="custom.component.ts">'+input.pattern+'</a>'
          }
        }}
    ];

    this.operations = [
      {
        title: '编辑',
        template: MenuEditComponent,
        onClickEvent: {
          apply: (row: any)=>{
            this.clickEditor(row)
          },
        },
      },
      // {
      //   operation: '详情',
      //   onClickEvent: {
      //     apply: (row: any)=>{
      //       this.clickDetail(row)
      //     },
      //   }
      // },
    ];
  }

  // clickDetail(row: any): any{
  //   // this.row = row;
  //   // this.editModal?.show()
  //   // this.rowDirective?.loadContentComponent(null)
  // }

  clickEditor(row: any): any{
    console.log(row, this.table);
  }

  onCancel(row:any){
    console.log('onCancel', row)
  }
  onOk(row:any){
    console.log('onOk', row)
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

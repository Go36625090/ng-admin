import {Component, EventEmitter, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {API_SERVICE, APIService} from "../../../common/api";
import {UserInfo} from "../../../models/user.info";
import {TableGridColumn, TableGridRowOperation, TableGridTransformer} from "../../../common/table.grid/models";
import {TableGridComponent} from "../../../common/table.grid/table.grid.component";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {NzModalComponent} from "ng-zorro-antd/modal";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css'],
})
export class CustomComponent implements OnInit {
  columns: TableGridColumn<any>[];
  operations: TableGridRowOperation[];

  @ViewChild('editModal') editModal: NzModalComponent | undefined;
  @ViewChild('detailModal') detailModal: NzModalComponent | undefined;

  @ViewChild(TableGridComponent) table: TableGridComponent<any> | undefined;
  row: any = {};
  constructor( @Inject(API_SERVICE)private api:APIService) {

    this.columns = [
      {name: 'id', kind: 'id',},
      {name: 'name', kind: 'name',sort: true},
      {name: 'pattern', kind: 'pattern', filter: true, transformer:{
        apply(input: any): any {
          return '<a href="custom.component.ts">'+input.pattern+'</a>'
        }
      }}
    ];
    this.operations = [
      {
        name: '编辑',
        onClickEvent: {
          apply: (row: any)=>{
            this.clickEditor(row)
          },
        }
      },
      {
        name: '详情',
        onClickEvent: {
          apply: (row: any)=>{
            this.clickDetail(row)
          },
        }
      },
    ];
  }

  clickDetail(row: any): any{
    this.row = row;
    this.detailModal?.open()
  }

  clickEditor(row: any): any{
    this.row = row;
    this.editModal?.open()
  }

  ngOnInit(): void {

  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.detailModal?.close()
    this.editModal?.close()
    this.row = undefined;
  }

  handleCancel(): void {
    this.detailModal?.close()
    this.editModal?.close()
    this.row = undefined;
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

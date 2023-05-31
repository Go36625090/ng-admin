import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {DefaultPagination, Pagination, TableData, TableGridColumn} from "./models";
import {NzModalService} from "ng-zorro-antd/modal";
import {RowOperation, TableRowOperation} from "./table.row.operation";

@Component({
  selector: 'app-table-grid',
  templateUrl: './table.grid.component.html',
  styleUrls: ['./table.grid.component.css'],
})
export class TableGridComponent<T> implements OnInit{

  data: any[] = [];
  @Input() columns: TableGridColumn<T>[];
  @Input() operations: TableRowOperation<T>[] | undefined;
  pagination: Pagination;
  onDataChangeEvent$: EventEmitter<TableData> = new EventEmitter<TableData>();
  @Output() onQueryParamsChangeEvent$: EventEmitter<NzTableQueryParams> = new EventEmitter<NzTableQueryParams>();

  loading: boolean = false;

  @Input()  enableSelect = false;
  @Output() onSelectItemEvent$: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDeselectItemEvent$: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectAllItemEvent$: EventEmitter<any[]> = new EventEmitter<any[]>();

  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<any>();

  constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    this.data = [];
    this.columns = [];
    this.pagination = DefaultPagination()
    this.onDataChangeEvent$.subscribe(value=>{
      this.loading = false;
      this.data = value.content;
      this.pagination = value.pagination;
    })
  }

  ngOnInit(): void {

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    // this.loading = true;
    this.onQueryParamsChangeEvent$.emit(params);
  }

  onAllChecked($event: boolean) {
    if($event){
      this.data.forEach(d=>this.setOfCheckedId.add(d.id));
      this.onSelectAllItemEvent$.emit(this.data);
    }else {
      this.setOfCheckedId.clear();
      this.onSelectAllItemEvent$.emit([]);
    }

  }

  onItemChecked(item: any, $event: boolean) {
    if($event){
      this.setOfCheckedId.add(item.id);
      this.onSelectItemEvent$.emit(item);
    }else {
      this.onDeselectItemEvent$.emit(item);
      this.setOfCheckedId.delete(item.id);
    }
  }

  createRowOperationModal(op: TableRowOperation<T>, data: any){
    const modal = this.modal.create({
      nzTitle: op.title,
      nzContent: op.template,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        data: data
      },

    });
    const instance: RowOperation<any> = modal.getContentComponent();

    modal.updateConfig({
      nzFooter: [
        {
          label: $localize `confirm`,
          onClick: componentInstance => {
            op.onClickEvent.apply(instance.result);
            modal.destroy();
          }
        }
      ]
    })

    modal.afterClose.subscribe(result => modal.destroy());
  }


}

import {NzTableFilterFn} from "ng-zorro-antd/table/src/table.types";
import {EventEmitter, Output} from "@angular/core";

export interface Pagination {
  size: number
  page: number
  total: number
}

export function DefaultPagination():Pagination{
    return {
      size: 30,
      page: 1,
      total: 0
  };
}

export interface TableData {
  content: any[]
  pagination: Pagination
}

export interface TableGridColumn<T> {
  name: string
  kind: string
  hidden?: boolean
  filter?: NzTableFilterFn<T> | boolean | null
  sort?: boolean
  transformer?: TableGridColumnTransformer
  transformerKind?: string
}

export declare interface TableGridColumnTransformer {
  apply(input: any): any;
}

export declare interface TableGridRowOperation {
  onEvent(input: any): any
  apply(input: any): any
}

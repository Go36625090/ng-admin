import {Type} from "@angular/core";
import {TableGridTransformer} from "./models";


export declare interface RowOperation<T> {
  data: T
  result: any
}

export class TableRowOperation<T> {
  constructor( public title: string,
  public template: Type<RowOperation<T>>, public onClickEvent: TableGridTransformer) {
  }
}

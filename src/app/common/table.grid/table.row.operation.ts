import {Type} from "@angular/core";
import {TableGridTransformer} from "./models";


export declare interface RowOperation {
  data: string
}

export class TableRowOperation {
  constructor( public title: string,
  public template: Type<RowOperation>, public onClickEvent: TableGridTransformer) {
  }
}

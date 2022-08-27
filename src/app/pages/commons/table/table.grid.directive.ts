import {Directive, EventEmitter, ViewContainerRef} from '@angular/core';
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Directive({
  selector: '[appTableGrid]'
})
export class TableGridDirective {
  onParamsChangeQueryEvent: (arg0: NzTableQueryParams) => void;
  constructor(public viewContainerRef: ViewContainerRef) { }

}

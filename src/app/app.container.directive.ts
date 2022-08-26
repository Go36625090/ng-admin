import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appContainerDirective]'
})
export class AppContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

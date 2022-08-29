import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'keepSafeHtml'
})
export class KeepSafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  transform(value: any, args?: any) {
    return this.sanitizer.sanitize(SecurityContext.HTML,  value);
  }
}

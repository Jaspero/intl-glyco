import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer
  ) {}

  transform(value: string, type = 'html') {

    const sanitizeMap = {
      html: 'bypassSecurityTrustHtml',
      style: 'bypassSecurityTrustStyle',
      script: 'bypassSecurityTrustScript',
      url: 'bypassSecurityTrustUrl',
      resourceUrl: 'bypassSecurityTrustResourceUrl'
    };

    return this.sanitizer[sanitizeMap[type]](value);
  }
}

import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
    name: 'sanitizeHtml'
  })
  export class SanitizeHtmlPipe implements PipeTransform {
  
    constructor(private sanitizer: DomSanitizer) {}
  
    transform(html: string): SafeHtml {
      // console.log("sanitizeHtml");
      // console.log(html);
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
  
  
  }
  
import {Writer} from "./writer";
import {HttpClient} from "@angular/common/http";

export class HttpWriter implements Writer{
  constructor(private http: HttpClient) {
  }
  write(...data: any[]): void {
    console.log(...data);
  }
}

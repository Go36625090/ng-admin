import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../../app.config";
import {Reporter} from "./reporter";

export class HttpReporter implements Reporter{
  constructor(private http: HttpClient, private appConfig: AppConfig) {
  }
  write(key: string, ...data: any[]): void {
    console.log(...data);
  }
}

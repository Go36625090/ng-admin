import {AppConfig} from "../../app.config";
import {Level} from "../../log/level";
import {Reporter} from "./reporter";

export class NoopReporter implements Reporter{
  constructor(private appConfig: AppConfig) {
  }
  write(level: Level, key: string, ...data: any[]): void {
    console.log(this.appConfig.getConfig('report')  ,...data);
  }
}

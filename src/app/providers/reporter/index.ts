import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../../app.config";
import {environment} from "../../../environments/environment";
import {HttpReporter} from "./http.reporter";
import {NoopReporter} from "./noop.reporter";
import {InjectionToken} from "@angular/core";
import {Reporter} from "./reporter";

export const REPORTER = new InjectionToken<Reporter>('REPORTER');

const reporterFactory = (httpClient: HttpClient, appConfig: AppConfig) =>
  environment.production ?
    new HttpReporter(httpClient, appConfig):
    new NoopReporter(appConfig);

export const REPORTER_PROVIDER = {
  provide: REPORTER,
  useFactory: reporterFactory,
  deps: [HttpClient, AppConfig]
}

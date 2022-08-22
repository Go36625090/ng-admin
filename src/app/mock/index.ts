import {environment} from "../../environments/environment";
import {NoopInterceptor} from "./noop-interceptor";
import {MockWebApiInterceptor} from "./mock-web-api-interceptor";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data.service";

export const MockWebApiModuleInterceptor = environment.production ? NoopInterceptor : MockWebApiInterceptor;


export const MockWebApiModule = environment.production ?
  [] : HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, {
      dataEncapsulation: true, apiBase: environment.api.startsWith('/')?environment.api.substring(1):environment.api,
      passThruUnknownUrl: true,
    });

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {API} from "./types";
import {BaseApiService} from "./base.api.service";

@Injectable()
export class ApiService extends BaseApiService{
  constructor(protected override http: HttpClient) {
      super(http);
  }

  pathParse(path: API.endpoint | API.method): string {
    return path.toString();
  }

  bodyParse(path: API.endpoint | API.method, body: any): any {
    return body;
  }

}

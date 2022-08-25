import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {BaseApiService} from "./base.api.service";
import {API} from "./types";

@Injectable()
export class MockApiService extends BaseApiService {

  constructor(protected override http: HttpClient) {
    super(http)
  }

  pathParse(path: API.endpoint): string {
    if(path.pattern){
      return this.api + path.pattern
    }
    return this.api;
  }

  bodyParse(path: API.endpoint, body: any):any {
    return body;
  }

}

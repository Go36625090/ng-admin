import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {BaseApiService} from "./base.api.service";
import {API} from "./types";

@Injectable()
export class MockApiService extends BaseApiService {



  constructor(protected override http: HttpClient) {
    super(http)
  }

  pathParse(path: API.method| API.endpoint): string {
    let p = '';

    if (!p.startsWith('http')) {
      if (!p.startsWith('/')) {
        return this.api + '/' + p.split('.').join('_')
      }
      return this.api + p.split('.').join('_');
    }
    return p;
  }

  bodyParse(path: API.method | API.endpoint, body: any):any {
    return body;
  }

}

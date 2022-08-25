import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {API} from "./types";
import {BaseApiService} from "./base.api.service";

@Injectable()
export class ApiService extends BaseApiService{
  constructor(protected override http: HttpClient) {
      super(http);
  }

  /**
   * url处理可执行修改
   * @param e
   */
  pathParse(e: API.endpoint): string {
    if(e.pattern){
      return this.api + e.pattern;
    }
    return this.api;
  }

  /**
   * 数据打包处理
   * @param e
   * @param body
   */
  bodyParse(e: API.endpoint, body: any): API.request {
    return {
      data: body,
      sign: "",
      sign_type: "MD5",
      timestamp: Math.floor(Date.now()/1000),
      version: "1.0.0",
      method: e.method || ''
    };
  }

}

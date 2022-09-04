import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {API} from "./types";
import {BaseApiService} from "./base.api.service";
import {RouterService} from "../../service/router.service";

@Injectable()
export class ApiService extends BaseApiService{
  constructor(protected override http: HttpClient, protected override rs: RouterService) {
      super(http, rs);
  }

  /**
   * url处理可执行修改
   * @param e
   */
  pathParse(e: API.endpoint): string {
    return this.api;
  }

  /**
   * 数据打包处理
   * @param e
   * @param body
   */
  bodyParse(e: API.endpoint, body: any): API.request {
    return {
      data: JSON.stringify(body),
      sign: "00000000000000000000000000000000",
      sign_type: "MD5",
      timestamp: Math.floor(Date.now()/1000),
      version: "1.0.0",
      method: e.method || ''
    };
  }

}

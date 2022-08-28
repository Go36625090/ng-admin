import {Injectable} from '@angular/core';
import {
  getStatusText,
  InMemoryDbService,
  RequestInfo,
  ResponseOptions,
  STATUS
} from "angular-in-memory-web-api";
import {Observable} from "rxjs";
import {API} from "./types";
import {menus} from "./mock-data/menu";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
  }
  login= {
    id: 1,
    username: "admin",
    token: "11111111111111111111111111111111",
    menus: menus,
    permissions: [{
      id: 1,
      name: '查询信息',
      pattern: 'about.info.query'
    }]
  };
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const users = [
      {id: 12, name: 'Dr. Nice'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr. IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];

    const welcomeinfoquery = {
        name: 'welcome.info.query'
    }

    return {
      users: users,
      user_account_login : this.login,
      welcome_info_query: welcomeinfoquery,
    };
  }

  post(reqInfo: RequestInfo) {
    let body = reqInfo.utils.getJsonBody(reqInfo.req)
    const isLoginFail = reqInfo.url == "user.account.login" && (body == null||body.username != 'admin');
    const response: API.response<any> = {
      code: 0, content: this.login, message: "", sign: "", timestamp: "", trace_id: ""

    }

    return reqInfo.utils.createResponse$(() => {
      const options: ResponseOptions =
        {
          body: response,
          status: isLoginFail?STATUS.UNAUTHORIZED: STATUS.OK
        }
      return this.finishOptions(options, reqInfo);
    });
  }

  put(reqInfo: RequestInfo) {
    let collection = reqInfo.collection;

    // process only requests as /api/object/:id
    if (!collection || !reqInfo.id)
      return reqInfo.utils.createResponse$(() => {
        const options: ResponseOptions = { status: STATUS.NOT_FOUND };
        return this.finishOptions(options, reqInfo);
      });

    // update an object
    let item: any = reqInfo.utils.findById(collection, reqInfo.id);
    const body = reqInfo.utils.getJsonBody(reqInfo.req)
    Object.assign(item, body);
    const response: API.response<any> = {
      code: 0, content: body, message: "", sign: "", timestamp: "", trace_id: ""

    }
    // respond
    return reqInfo.utils.createResponse$(() => {
      const options: ResponseOptions =
        {
          body: response,
          status: STATUS.OK
        }
      return this.finishOptions(options, reqInfo);
    });
  }

  private finishOptions(options: ResponseOptions, { headers, url }: RequestInfo) {
    if (options.status != null) {
      options.statusText = getStatusText(options.status);
    }
    options.headers = headers;
    options.url = url;
    return options;
  }
  genId(heroes: any[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}

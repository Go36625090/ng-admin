import {Injectable} from '@angular/core';
import {InMemoryDbService, RequestInfo} from "angular-in-memory-web-api";
import {Observable, of} from "rxjs";
import {User} from "../models/user";
import {LoginResponse} from "../models/login-response";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
  }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const users: User[] = [
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
    const login: LoginResponse = {
        id: 1,
        username: "mock_user",
        token: "",
        menus: [{
          id: 1,
          name: '关于我们',
          pattern: '/about'
        }],
        permissions: [{
          id: 1,
          name: '查询信息',
          pattern: 'about.info.query'
        }]
      };
    const welcomeinfoquery = {
        name: 'welcome.info.query'
    }

    return {
      users: users,
      login: login,
      welcome_info_query: welcomeinfoquery,
    };
  }

  genId(heroes: User[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}

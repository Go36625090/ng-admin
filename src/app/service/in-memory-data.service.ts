import { Injectable } from '@angular/core';
import {InMemoryDbService, RequestInfo} from "angular-in-memory-web-api";
import {Observable, of} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const users = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    const permissions = [
      { id: 112, name: 'Dr. Nice' },
      { id: 113, name: 'Bombasto' },
      { id: 114, name: 'Celeritas' },
      { id: 115, name: 'Magneta' },
      { id: 116, name: 'RubberMan' },
      { id: 117, name: 'Dynama' },
      { id: 118, name: 'Dr. IQ' },
      { id: 119, name: 'Magma' },
      { id: 120, name: 'Tornado' }
    ];
    return {users, permissions};
  }

  genId(heroes: User[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}

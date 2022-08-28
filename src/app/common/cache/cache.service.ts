import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private storage: Storage;
  constructor() {
    this.storage = localStorage;
  }

  get<T>(key: string): T|null {
    const value = this.storage.getItem(key);
    if(value){
      return JSON.parse(value) as T;
    }
    return null;
  }

  set(key: string, value: any):void{
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key:string){
    this.storage.removeItem(key);
  }

  clear():void{
    this.storage.clear();
  }

  keys():string[]{
    let keys: string[] = [];
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if(key){
        keys.push(key);
      }
    }
    return keys;
  }
}

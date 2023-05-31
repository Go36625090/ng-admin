import {NZ_CONFIG, NzConfig} from "ng-zorro-antd/core/config";
import {APP_INITIALIZER, Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  message: { nzTop: 120 },
  notification: { nzTop: 240 },
  // icon: { nzTheme: 'twotone' },
};

export const NZ_CONFIG_PROVIDER = { provide: NZ_CONFIG, useValue:  ngZorroConfig  };


@Injectable({providedIn: 'root'})
export class AppConfig {

  private config: any = {};
  constructor(private http: HttpClient) {

  }

  public getConfigValue(){
    return this.config;
  }

  public getConfig<T>(key: any): T {
    if(null == this.config){
      return {} as T;
    }
    let value = this.config[key];
    if(value == null){
      return {} as T;
    }
    return value as T;
  }
  async loadAppConfig(): Promise<any> {
    let err: string;
    let ret: boolean;

    await this.http.get(environment.config_url).subscribe(
      {
        next: value => {
          this.config = value;
          return value;
        },
      error: (error) => {
        this.config = {};
        err = `status: ${error.status} url: ${error.url}`;
        return error;
        }
      }
    );
    return new Promise((resolve, reject)=>{
        resolve(ret);
        reject(err);
    });
  }

}

export const ApplicationInit = (appConfig: AppConfig): ()=> Promise<any> =>{
  return (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      appConfig.loadAppConfig()
        .then( value => resolve(value))
        .catch(err => reject(err))
    });
  }
}

export const CONFIG_PROVIDER = { provide: APP_INITIALIZER, useFactory: ApplicationInit, deps: [AppConfig], multi: true };

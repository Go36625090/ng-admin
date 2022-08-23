import {NZ_CONFIG, NzConfig} from "ng-zorro-antd/core/config";
import {APP_INITIALIZER, ApplicationInitStatus, Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";

const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  message: { nzTop: 120 },
  notification: { nzTop: 240 },
  // icon: { nzTheme: 'twotone' },
};

export const NZ_CONFIG_PROVIDER = { provide: NZ_CONFIG, useValue:  ngZorroConfig  };


@Injectable({providedIn: 'root'})
export class AppConfig {

  public config: any = {};
  constructor(private http: HttpClient) {

  }
  public getConfig(key: any): any {
    if(null == this.config){
      return {};
    }
    const value = this.config[key];
    if(value == null){
      return {}
    }
    return value;
  }

  loadAppConfig(): Observable<any> {
    return this.http.get(environment.config_url).pipe(
      map((response: any) => {
        this.config = response;
        return true;
      }),
      catchError((error) => {
        this.config = {};
        return of(error);
      })
    )
  }

}

export function onAppInit1(config: AppConfig): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      config.loadAppConfig().subscribe(
        {
          next: value => resolve(true),
          error: err => reject(err),
        }
      )
    });
  };
}

export const ApplicationInit = (appConfig: AppConfig): ()=>Promise<any> =>{
  return (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      appConfig.loadAppConfig().subscribe({
        next: value => resolve(value),
        error: err => reject(err)
      })
    });
  }
}

export const CONFIG_PROVIDER = { provide: APP_INITIALIZER, useFactory: onAppInit1, deps: [AppConfig], multi: true };

import {en_US, NZ_I18N, zh_CN} from "ng-zorro-antd/i18n";
import {LOCALE_ID} from "@angular/core";

/** 配置 ng-zorro-antd 国际化 **/
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';

registerLocaleData(en);
registerLocaleData(zh);

export const LOCALE_PROVIDER = {
  provide: NZ_I18N,
  useFactory: (localId: string) => {
    switch (localId) {
      case 'en':
        return en_US;
      /** 与 angular.json i18n/locales 配置一致 **/
      case 'zh':
        return zh_CN;
      default:
        return en_US;
    }
  },
  deps: [LOCALE_ID]
};

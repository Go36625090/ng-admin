import {NZ_CONFIG, NzConfig} from "ng-zorro-antd/core/config";

const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  message: { nzTop: 120 },
  notification: { nzTop: 240 },
  // icon: { nzTheme: 'twotone' },
};

export const NZ_CONFIG_PROVIDER = { provide: NZ_CONFIG, useValue:  ngZorroConfig  };

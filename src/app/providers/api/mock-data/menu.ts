import {Menu} from "../../../models/menu";

export const menus: Menu[][] = [
  [{
    id: 1, name: "Dashboard",  pattern: "dashboard", sort: 1, type: 0,icon: "dashboard",
    i18nNames: {
      'zh': '仪表盘'
    },
    submenus: [
      {
        id: 1, name: "main",  pattern: "main", sort: 1, type: 1,icon: "home",
        i18nNames: {
          'zh': '主看板'
        }
      },
      {
        id: 2, name: "custom",  pattern: "custom", sort: 2, type: 1, icon: "customer-service",
        i18nNames: {
          'zh': '自定义看板'
        }
      }
    ]
  }],
  [{
    id: 2, name: "Setting",  pattern: "setting", sort: 2, type: 0,icon: "setting",
    i18nNames: {
      'zh': '设置'
    },
    submenus: [
      {
        id: 1, name: "menu",  pattern: "menu", sort: 1, type: 1,icon: "menu",
        i18nNames: {
          'zh': '菜单管理'
        }
      },
      {
        id: 2, name: "permission",  pattern: "permission", sort: 2, type: 1, icon: "key",
        i18nNames: {
          'zh': '权限管理'
        }
      }
    ]
  }],
  [{
    id: 3, name: "About",  pattern: "about", sort: 2, type: 1,icon: "info-circle",
    i18nNames: {
      'zh': '关于我们'
    }
  }]
]

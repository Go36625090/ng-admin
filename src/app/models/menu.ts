export interface Menu {
  id: number
  name: string
  type: number
  sort: number
  icon: string
  pattern: string
  i18nNames:{[lang:string]:string}
  submenus?: Menu[]
}

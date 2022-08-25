export interface Menu {
  id: number
  name: string
  i18nNames:{[lang:string]:string}
  type: number
  sort: number
  pattern: string
  submenus?: Menu[]
}

export interface Menu {
  id: number
  name: string
  pattern: string
  submenus?: [Menu]
}

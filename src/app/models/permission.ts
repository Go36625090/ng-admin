export enum PermissionType {
  Menu,
  Button
}

export interface Menu{
  id: number
  name: string
  pattern: string
  submenus: [Menu]
}

export interface Permission {
  id: number
  name: string
}

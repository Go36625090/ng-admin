import {Menu} from "./menu";
import {Permission} from "./permission";

export interface LoginResponse {
  id: number
  token: string
  principal: {[key:string]: any}
  menus: Menu[]
  permissions: Permission[]
}

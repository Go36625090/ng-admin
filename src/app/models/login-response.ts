import {Menu} from "./menu";
import {Permission} from "./permission";

export interface LoginResponse {
  id: number
  username: string
  token: string
  menus: Menu[]
  permissions: Permission[]
}

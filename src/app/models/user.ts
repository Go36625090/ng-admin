import {Permission} from "./permission";

export interface User {
  id: number
  name: string
  permissions?: {[key: string]: Permission}
}

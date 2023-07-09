import { User } from "../user/user";

export interface DataList {
  id: number,
  user: User,
  data: Array<string>,
  name: string
}

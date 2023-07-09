import { DataList } from "../data-list/dataList";

export interface User {
  id: number,
  email: string,
  datas: Array<DataList>
}

import { ColumnType } from "antd/es/table";

/**扩展table columns */
export interface TableColumns<T> extends ColumnType<T> {
  /**该字段是否可搜索 */
  search?: boolean;
}
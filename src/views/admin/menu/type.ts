import { SlideMenu } from "@/store/type";

/**0:左菜单，1：按钮 */
export type MenuType = '0' | '1'

/**tree组件数据格式 */
export interface TreeDataModel {
  label?: string;
  value?: number;
  disabled?: boolean;
  children?: TreeDataModel[]
}

export interface MenuForm {
  /**菜单id */
  menuId?: number;
  /**0：菜单，1：按钮 */
  type: "0" | "1"
  /**父菜单id */
  parentId: number;
  /**菜单图标 */
  icon: string;
  /**菜单名称 */
  name: string;
  /**路由地址 */
  path: string;
  /**排序，值越小越靠前 */
  sort: number;
  /**是否缓存 */
  keepAlive: "0" | "1";
}

export interface MenuDetail extends MenuForm {
  /**创建渠道 */
  createBy: any;
  /**创建时间 */
  createTime: string;
  /**删除标志位 */
  delFlag: '0' | '1'
  /**更新人 */
  updateBy: string;
  /**更新时间 */
  updateTime: string;
}

import { SlideMenu } from '@/store/type'
import { Get, Post, Delete, Put } from '@/utils/request'
import { MenuDetail, MenuForm } from './type'

/**获取菜单详情 */
export function fetchMenuDetail(params: { parentId: number }) {
  return Get<MenuDetail>('/admin/menu', params)
}

/**获取菜单列表 */
export function fetchMenuTree(params: { lazy: boolean, parentId?: number }) {
  return Get<SlideMenu[]>('/admin/menu/tree', params)
}

/**添加菜单 */
export function fetchInsertMenu(params: MenuForm) {
  return Post<boolean>('/admin/menu', params)
}

export function fetchMenuInfo(id: number) {
  return Get<MenuDetail>(`/admin/menu/${id}`)
}

/**删除菜单 */
export function fetchDeleteMenu(id: number) {
  return Delete<boolean>(`/admin/menu/${id}`)
}

/**修改菜单 */
export function fetchUpdateMenu(params: MenuForm) {
  return Put<boolean>('/admin/menu', params)
}

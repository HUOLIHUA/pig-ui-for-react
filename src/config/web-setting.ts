import { SlideMenu } from "@/store/type"

export const HOST_API = 'http://admin-gateway:9999'
/**路由白名单 */
export const whiteList = ['/login']
/**欢迎页 */
export const welcomePage: SlideMenu = {
  icon: '',
  id: 0,
  /**是否缓存 */
  keepAlive: '1',
  label: 'welcome',
  name: 'welcome',
  /**父菜单id */
  parentId: -1,
  path: '/welcome/index',
  /**排序，值越小越靠前 */
  sort: 0,
  type: '1'
}
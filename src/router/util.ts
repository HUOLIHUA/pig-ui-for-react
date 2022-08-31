
import Loadable from '@loadable/component'
import type { SlideMenu } from "@/store/type";
import type { RouteConfig } from "@/type";
import { isUrl } from "@/utils/validate";
import routes from './index'

/**
 * vite glob导入  
 * @see https://vitejs.cn/guide/features.html#glob-import
*/

//二级路由文件在该module下查找
const folderModuleOne = import.meta.glob(`../views/*/*/*.tsx`);
//一级路由文件在该module下查找
const folderModuleTwo = import.meta.glob(`../views/*/*.tsx`);

/**
 * 动态加载路由
 * @param menu 左侧路由列表
 * @param isFirst 是否为首路由
 * @description 目前只处理了二级路由
 */
export function formatRoutes(
  menu: SlideMenu[],
  isFirst: boolean
): RouteConfig[] {
  const result = [];
  if (menu.length === 0) {
    return [];
  }
  for (let i = 0; i < menu.length; i++) {
    const menuObj = menu[i];
    /** 跳过加载静态routes对应的路由路由 */
    if (routes.some((item) => item.path === menuObj.path)) {
      return [];
    }

    /**获取路由的path */
    const menuPath = (() => {
      if (!menuObj.path) {
        return;
      }
      if (isFirst) {
        return menuObj.path.replace("/index", "");
      }
      return menuObj.path;
    })();

    /**判断路由有没有子路由 */
    const haveChildren = menuObj.children && menuObj.children.length !== 0;

    const route: RouteConfig = {
      name: menuObj.name,
      path: menuPath,
      /**这里的组件使用 @loadable/component异步加载 */
      component: (() => {
        // TODO 目前只处理了二级路由， 如果有三级路由等等这里需要做处理
        if (isFirst) {
          return Loadable(() => import(`../layout/index`));
        }
        /**
         * Loadable(componentFile) 等于 Loadable(() => import(`../views${menuPath}`))
         * 两种写法皆可，后者写法vite会报警告The above dynamic import cannot be ana
         */
        const componentFile = folderModuleOne[`../views${menuPath}.tsx`]
        return Loadable(componentFile);
      })(),

      routes: !haveChildren
        ? (() => {
          if (isFirst) {
            if (isUrl(menuPath!)) {
              return [];
            }
            return [
              {
                name: menuObj.name,
                path: menuPath + "/index",
                component: (() => {
                  const componentFile = folderModuleTwo[`../views${menuPath}/index.tsx`];
                  return Loadable(componentFile);
                })(),
              },
            ];
          }
          return [];
        })()
        : (() => {
          return formatRoutes(menuObj.children, false);
        })(),
    };
    result.push(route);
  }
  return result;
}
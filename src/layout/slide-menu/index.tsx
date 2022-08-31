import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Menu } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { SlideMenu } from "@/store/type";
import { welcomePage } from "@/config/web-setting";
import styles from "./index.module.less";
import { HIcon } from "../../components";
import { insertTag } from "@/store/slice/tags";

const SlideMenuIndex: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const menuList = useAppSelector((state) => state.user.menu);
  const inlineCollapsed = useAppSelector(
    (state) => state.common.inlineCollapsed
  );
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  /**设置默认展开的menu */
  useMemo(() => {
    const current = menuList.find((item) => pathname.indexOf(item.path) !== -1);
    if (current) {
      return setOpenKeys([current.path]);
    }
    return setOpenKeys([]);
  }, [pathname, setOpenKeys]);

  /**点击菜单时只保留一个menu展开 */
  const onOpenMenu = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    latestOpenKey ? setOpenKeys([latestOpenKey]) : setOpenKeys([]);
  };

  /**点击菜单切换页面 */
  const onClickMenu = (menu: SlideMenu) => {
    history.push(menu.path);
    dispatch(
      insertTag({
        label: menu.label,
        path: menu.path,
      })
    );
  };

  return (
    <div
      className={`${styles["slide-wrapper"]} ${
        inlineCollapsed && styles["iscollapsed"]
      }`}
    >
      <div
        className={styles["logo-wrapper"]}
        onClick={() => history.push(welcomePage.path)}
      >
        {!inlineCollapsed ? "React PigX" : "Pig"}
      </div>
      <Menu
        className={styles["menu-wrapper"]}
        mode="inline"
        defaultSelectedKeys={[pathname]}
        selectedKeys={[pathname]}
        openKeys={openKeys}
        onOpenChange={onOpenMenu}
        inlineCollapsed={inlineCollapsed}
      >
        {menuList.map(
          (item) =>
            item.path !== welcomePage.path && (
              <Menu.SubMenu
                key={item.path}
                title={item.name}
                icon={<HIcon type={item.icon} size={18} />}
              >
                {item.children?.map((childrenItem) => (
                  <Menu.Item
                    key={childrenItem.path}
                    icon={<HIcon type={childrenItem.icon} size={18} />}
                    onClick={(e) => onClickMenu(childrenItem)}
                  >
                    {childrenItem.name}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            )
        )}
      </Menu>
    </div>
  );
};

export default SlideMenuIndex;

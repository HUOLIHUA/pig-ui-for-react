import { whiteList } from "@/config/web-setting";
import { useAppSelector } from "@/store";
import { SlideMenu } from "@/store/type";
import { FC } from "react";
import { Redirect, useLocation, matchPath } from "react-router-dom";
const Author: FC = ({ children }) => {
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const menuList = useAppSelector((state) => state.user.menu);
  const isLockScreen = useAppSelector((state) => state.common.isLockScreen);
  const { pathname } = useLocation();

  /**判断路由是否合法 */
  const validateRoute = (slideMenu: SlideMenu[], pathname: string): boolean => {
    return slideMenu.some((route) => {
      if (route.children) {
        return validateRoute(route.children, pathname);
      }
      return matchPath(pathname, { path: route.path, exact: true });
    });
  };

  const hasPermission = () => {
    if (!whiteList.includes(pathname)) {
      if (accessToken) {
        return validateRoute(menuList, pathname);
      }
      return false;
    }
    return true;
  };

  if (!userInfo) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  if (!hasPermission()) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  /**是否锁屏 */
  if (isLockScreen) {
    return <Redirect to={{ pathname: "/lock-screen" }} />;
  }

  return <>{children}</>;
};

export default Author;

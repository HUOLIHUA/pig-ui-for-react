import routesSync, { formatRoutes, renderRoutes } from "./router";
import { HashRouter } from "react-router-dom";
import { useMemo } from "react";
import { Spin } from "antd";
import { useAppSelector } from "./store";
import "./App.css";

function App() {
  const menuList = useAppSelector((state) => state.user.menu);
  const routes = useMemo(() => {
    const asyncRoutes = formatRoutes(menuList, true);
    return routesSync.concat(asyncRoutes);
  }, [menuList, routesSync]);

  console.log(routes);
  return <HashRouter>{renderRoutes(routes)}</HashRouter>;
}

export default App;

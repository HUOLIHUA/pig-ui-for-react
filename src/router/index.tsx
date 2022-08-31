import { Redirect, Route, Switch } from "react-router-dom";
import { RouteConfig } from "@/type";
import Login from "@/views/login";
import LockScreen from "@/views/lock-screen";
import ErrorPage from "@/views/404";
const routesSync: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    redirect: "/login",
  },
  {
    name: "登录",
    path: "/login",
    component: Login,
  },
  {
    name: "锁屏",
    path: "/lock-screen",
    component: LockScreen,
  },
];

// TODO 路由处理404
export const routerOther: RouteConfig[] = [
  {
    name: "404",
    path: "/404",
    component: ErrorPage,
  },
  {
    path: "*",
    redirect: "/404",
  },
];

/**渲染路由 */
export function renderRoutes(routes: RouteConfig[]) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          exact={route.exact}
          key={index}
          path={route.path}
          render={(props) => (
            <route.component {...props} routes={route.routes} />
          )}
        >
          {route.redirect && (
            <Redirect to={{ pathname: route.redirect }}> </Redirect>
          )}
        </Route>
      ))}
    </Switch>
  );
}

export default routesSync;
export { formatRoutes } from "./util";

import type { FC } from "react";
import styles from "./index.module.less";
import LayoutHeader from "./header";
import LayoutSlideMenu from "./slide-menu";
import LayoutContent from "./content";
import { RouteConfig } from "@/type";
import { renderRoutes } from "@/router";
import AuthorWrapper from "./author-wrapper";

const LayOut: FC<{ routes: RouteConfig[] }> = ({ routes }) => {
  return (
    <div className={styles["container-wrapper"]}>
      <AuthorWrapper>
        <LayoutHeader />
        <LayoutSlideMenu />
        <LayoutContent>{routes && renderRoutes(routes)}</LayoutContent>
      </AuthorWrapper>
    </div>
  );
};

export default LayOut;

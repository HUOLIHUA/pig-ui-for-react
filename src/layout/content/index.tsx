import { useAppSelector } from "@/store";
import { FC } from "react";
import styles from "./index.module.less";
const Content: FC = ({ children }) => {
  const inlineCollapsed = useAppSelector(
    (state) => state.common.inlineCollapsed
  );
  return (
    <div
      className={`${styles["content-wrapper"]} ${
        inlineCollapsed && styles["iscollapsed"]
      }`}
    >
      <div className={styles["content"]}>{children}</div>
    </div>
  );
};

export default Content;

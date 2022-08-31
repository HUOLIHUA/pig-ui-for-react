import { FC, useEffect, useState } from "react";
import { Tooltip } from "antd";
import {
  isFullscreenElement,
  requestFullScreen,
  exitFullScreen,
} from "@/utils/util";
import styles from "../index.module.less";
import { HIcon } from "@/components";
const FullScreen: FC = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const [originResizeFunc, setOriginResizeFunc] = useState<any>(null);
  useEffect(() => {
    // 监听 键盘ESC 退出全屏(可以使用屏幕大小监听，触发对应的事件)
    if (window.addEventListener) {
      window.addEventListener("resize", onEscCancelFull, false);
    } else {
      setOriginResizeFunc(window.onresize);
      window.onresize = onEscCancelFull;
    }
    // 销毁清除事件
    return () => {
      if (window.removeEventListener) {
        window.removeEventListener("resize", onEscCancelFull, false);
      } else {
        window.onresize = originResizeFunc;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  function onEscCancelFull() {
    // 用于反显状态
    setFullScreen(isFullscreenElement());
  }

  return (
    <Tooltip title="全屏" placement="bottom" className={styles["item"]}>
      <div
        className={styles["item"]}
        onClick={() => {
          fullScreen ? exitFullScreen() : requestFullScreen(document.body);
        }}
      >
        <HIcon
          type="icon-quanping"
          color="#fff"
          size={18}
          cursor="pointer"
        ></HIcon>
      </div>
    </Tooltip>
  );
};

export default FullScreen;

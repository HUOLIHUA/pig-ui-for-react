import { useAppDispatch, useAppSelector } from "@/store";
import { Tooltip, Dropdown, Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { loginOut } from "@/store/slice/user";
import { useHistory } from "react-router";
import { HIcon } from "../../components";
import styles from "./index.module.less";
import Tags from "./tags";
import FullScreen from "./full-screen";
import Lock from "./lock";
import { setInlineCollapsed } from "@/store/slice/common";
// import { useMount } from "ahooks";
// import { fetchCheckToken } from "@/store/services";
const Header: FC = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const inlineCollapsed = useAppSelector(
    (state) => state.common.inlineCollapsed
  );
  const dispatch = useAppDispatch();
  const history = useHistory();

  /**退出 */
  const onLoginOut = () => {
    dispatch(loginOut());
    history.push("/");
  };

  /** */
  function renderDropDownMenu() {
    return (
      <Menu>
        <Menu.Item key={1}>个人信息</Menu.Item>
        <Menu.Item key={2} onClick={onLoginOut}>
          退出系统
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <div
      className={`${styles["header-wrapper"]} ${
        inlineCollapsed && styles["iscollapsed"]
      }`}
    >
      <div className={styles["header-content"]}>
        <div
          className={styles["left"]}
          onClick={() => dispatch(setInlineCollapsed(!inlineCollapsed))}
        >
          <HIcon
            type="icon-zhedie"
            size={24}
            color="#fff"
            cursor="pointer"
          ></HIcon>
        </div>
        <div className={styles["right"]}>
          <Tooltip title="错误日志" placement="bottom">
            <div className={styles["item"]}>
              <HIcon
                type="icon-bug"
                color="#fff"
                size={18}
                cursor="pointer"
              ></HIcon>
            </div>
          </Tooltip>

          {/* 锁屏 */}
          <Lock />
          {/* 全屏 */}
          <FullScreen />
          <Dropdown overlay={renderDropDownMenu} arrow placement="bottomRight">
            <div className={styles["user-info"]}>
              <img className={styles["avatar"]} src={userInfo?.avatar} />
              <span className={styles["text"]}>{userInfo?.username}</span>
              <HIcon type="icon-xia" color="#fff"></HIcon>
            </div>
          </Dropdown>
        </div>
      </div>
      <Tags />
    </div>
  );
};

export default Header;

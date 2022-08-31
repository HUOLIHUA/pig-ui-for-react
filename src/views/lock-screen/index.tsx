import { HIcon } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store";
import { setIsLockScreen } from "@/store/slice/common";
import { loginOut } from "@/store/slice/user";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Input, message, Tooltip, Modal } from "antd";
import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./index.module.less";

const LockScreen: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const lockScreenPassword = useAppSelector(
    (state) => state.common.lockScreenPasswod
  );
  const currentMenu = useAppSelector(
    (state) => state.common.lockScreenPreviousMenu
  );
  const [inputValue, setInputValue] = useState("");
  const [passwdError, setPasswdError] = useState<boolean>(false);
  const [pass, setPass] = useState<boolean>(false);
  /**解锁 */
  const onUnlock = () => {
    if (!inputValue) {
      message.warn("请输入密码");
      setPasswdError(true);
      setTimeout(() => {
        setPasswdError(false);
      }, 1000);
      return;
    }
    if (inputValue !== lockScreenPassword) {
      message.error("密码不正确");
      setInputValue("");
      setPasswdError(true);
      setTimeout(() => {
        setPasswdError(false);
      }, 1000);
      return;
    }
    setPass(true);

    dispatch(setIsLockScreen(false));
    setTimeout(() => {
      currentMenu && history.replace(currentMenu.path);
    }, 1000);
  };

  const onLoginOut = () => {
    Modal.confirm({
      title: "是否退出系统, 是否继续?",
      icon: <ExclamationCircleOutlined />,
      okText: "确定",
      cancelText: "取消",
      onOk() {
        dispatch(loginOut());
        dispatch(setIsLockScreen(false));
        history.replace("/");
      },
    });
  };

  return (
    <div className={styles["lock-wrapper"]}>
      <div className={`${styles["lock-content"]} animated bounceInDown`}>
        <div
          className={`animated ${passwdError && "shake"} ${
            pass && "bounceOut"
          } `}
        >
          <h3 className={styles["title"]}>{userInfo?.username}</h3>
          <div className={styles["input-wrapper"]}>
            <Input
              type="password"
              className={styles["input"]}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Tooltip title="解锁" placement="bottom">
              <div className={styles["icon-wrapper"]} onClick={onUnlock}>
                <HIcon type="icon-kaisuo" cursor="pointer" size={22}></HIcon>
              </div>
            </Tooltip>
            <Tooltip title="退出系统" placement="bottom">
              <div className={styles["icon-wrapper"]} onClick={onLoginOut}>
                <HIcon type="icon-tuichu" cursor="pointer" size={22}></HIcon>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LockScreen;

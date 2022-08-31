import { Tooltip } from "antd";
import { FC, useState } from "react";
import HIcon from "@/components/h-icon";
import { Modal, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import styles from "../index.module.less";
import {
  setIsLockScreen,
  setLockScreenPasswod,
  setLockScreenPreviousMenu,
} from "@/store/slice/common";
import { useHistory, useLocation } from "react-router-dom";
import { SlideMenu } from "@/store/type";

const Lock: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const menu = useAppSelector((state) => state.user.menu);
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm<{ pwd: string }>();
  const { pathname } = useLocation();

  /**锁屏前查找当前菜单信息保存起来，解锁时直接定位到该菜单 */
  const queryCurrentMenu = (
    menuList: SlideMenu[],
    pathname: string
  ): SlideMenu | undefined => {
    // TODO for..of可以使用return跳出递归
    for (const item of menuList) {
      if (item.path === pathname) {
        return item;
      }
      if (item.children) {
        return queryCurrentMenu(item.children, pathname);
      }
    }
  };

  /** */
  const onConfirm = async () => {
    await form.validateFields();
    const menuInfo = queryCurrentMenu(menu, pathname);
    const formdata = form.getFieldsValue();
    dispatch(setLockScreenPasswod(formdata.pwd));
    dispatch(setLockScreenPreviousMenu(menuInfo!));
    dispatch(setIsLockScreen(true));
    history.push("/lock-screen");
  };

  return (
    <>
      <Tooltip title="锁屏" placement="bottom" className={styles["item"]}>
        <div className={styles["item"]} onClick={() => setVisible(true)}>
          <HIcon
            type="icon-lock"
            color="#fff"
            size={18}
            cursor="pointer"
          ></HIcon>
        </div>
      </Tooltip>
      <Modal
        title="锁屏"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => onConfirm()}
      >
        <Form form={form} name="control-hooks">
          <Form.Item
            label="锁屏密码"
            name="pwd"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input maxLength={11} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Lock;

import { HIcon } from "@/components";
import { Tooltip, Modal, Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { FC, useState } from "react";
import styles from "../index.module.less";

const Theme: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const onChangeTheme = (e: RadioChangeEvent) => {
    console.log(e.target);
  };
  return (
    <>
      <Tooltip title="更换主题" placement="bottom" className={styles["item"]}>
        <div className={styles["item"]} onClick={() => setVisible(true)}>
          <HIcon
            type="icon-yanjing"
            color="#fff"
            size={18}
            cursor="pointer"
          ></HIcon>
        </div>
      </Tooltip>
      <Modal title="主题" visible={visible} footer={null}>
        <Radio.Group
          name="radiogroup"
          defaultValue={1}
          onChange={(e) => onChangeTheme(e)}
        >
          <Radio value={1}>默认</Radio>
          <Radio value={2}>墨黑</Radio>
          <Radio value={3}>深蓝</Radio>
          {/* <Radio></Radio> */}
        </Radio.Group>
      </Modal>
    </>
  );
};

export default Theme;

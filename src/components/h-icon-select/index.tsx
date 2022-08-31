import { Modal } from "antd";
import type { FC } from "react";
import { memo } from "react";
import iconList from "@/config/icon-list";
import HIcon from "../h-icon";
import styles from "./index.module.less";
interface Props {
  visible: boolean;
  onChange: (value?: string) => void;
}

const HIconSelect: FC<Props> = ({ visible, onChange }) => {
  return (
    <Modal
      title="阿里云图标"
      visible={visible}
      width={800}
      footer={null}
      onCancel={() => onChange()}
    >
      {iconList.value.map((item) => (
        <div
          key={item}
          className={styles["item"]}
          onClick={() => onChange(item)}
        >
          <HIcon type={item} size={22}></HIcon>
          <span className={styles["text"]}>{item}</span>
        </div>
      ))}
    </Modal>
  );
};

export default memo(HIconSelect, (oldProp, nowProp) => {
  return oldProp.visible === nowProp.visible;
});

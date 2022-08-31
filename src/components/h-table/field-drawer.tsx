import { Drawer, Transfer } from "antd";
import { FC, useMemo, useState } from "react";
import type { TableColumns } from "../type";
import type { TransferDirection, TransferItem } from "antd/es/transfer";

interface Props {
  columns?: TableColumns<any>[];
  visible?: boolean;
  /**切换 */
  onChange?: (key: string[]) => void;
  /**关闭抽屉 */
  onClose?: () => void;
}

const FieldDrawer: FC<Props> = ({ columns, visible, onClose, onChange }) => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // TODO 这里的类型TransferItem写法太过暴力
  const dataList = useMemo<TransferItem[]>(() => {
    if (!columns) {
      return [];
    }
    let result: TransferItem[] = [];
    columns.map((item) => {
      if (item.dataIndex) {
        const obj = {
          key: item.dataIndex,
          title: item.title,
          description: item.title,
        } as TransferItem;
        result.push(obj);
      }
    });
    return result;
  }, [columns]);

  /**切换item时触发 */
  const onChangeTarget = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
    onChange && onChange(nextTargetKeys);
  };

  /**选中item触发 */
  const onSelectChange = (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <Drawer
      title="列显隐"
      placement="right"
      visible={visible}
      maskClosable
      width={700}
      onClose={onClose}
    >
      <Transfer
        dataSource={dataList}
        titles={["显示", "隐藏"]}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChangeTarget}
        onSelectChange={onSelectChange}
        render={(item) => item.title || ""}
        listStyle={{
          width: 300,
          height: 600,
        }}
      />
    </Drawer>
  );
};

export default FieldDrawer;

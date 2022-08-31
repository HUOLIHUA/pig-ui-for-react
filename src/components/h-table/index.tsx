import { FC, useMemo, useState } from "react";
import { Button, Table, Tooltip } from "antd";
import type { TableProps, ColumnType } from "antd/es/table";
import { SyncOutlined, BarsOutlined } from "@ant-design/icons";
import FieldDrawer from "./field-drawer";
import styles from "./index.module.less";
interface Props extends TableProps<any> {
  /**是否显示显隐筛选 */
  showFilterField?: boolean;
  /**是否显示刷新按钮 */
  showRefresh?: boolean;
  /**是否显示搜索按钮 */
  showSearch?: boolean;
  /**刷新列表 */
  onRefresh: () => void;
}

const HTable: FC<Props> = ({ children, columns, onRefresh, ...arg }) => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [copyColumns, setCopyColumns] = useState(columns);
  const [renderColumns, setRenderColumns] = useState(columns);

  const onChangeField = (keys: string[]) => {
    if (copyColumns) {
      const result = copyColumns.filter((item): item is ColumnType<any> => {
        const columnsDataIndex = (item as ColumnType<any>).dataIndex;
        if (columnsDataIndex) {
          return keys.indexOf(columnsDataIndex) === -1;
        }
        return false;
      });
      setRenderColumns(result);
    }
  };
  return (
    <>
      <div className={styles["op-wrapper"]}>
        <div className={styles["left"]}>{children}</div>
        <div className={styles["right"]}>
          <Button.Group>
            <Tooltip title="刷新" placement="bottomRight">
              <Button icon={<SyncOutlined />} onClick={onRefresh}></Button>
            </Tooltip>
            <Tooltip title="显隐" placement="bottomRight">
              <Button
                icon={<BarsOutlined />}
                onClick={() => setDrawerVisible(true)}
              ></Button>
            </Tooltip>
          </Button.Group>
        </div>
      </div>
      <Table {...arg} columns={renderColumns} />
      {/* 抽屉 */}
      <FieldDrawer
        columns={copyColumns}
        visible={drawerVisible}
        onChange={onChangeField}
        onClose={() => setDrawerVisible(false)}
      />
    </>
  );
};

export default HTable;

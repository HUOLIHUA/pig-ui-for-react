import { HIcon, HTable } from '@/components';
import { SlideMenu } from '@/store/type';
import { Button, Form, Table, Tag } from 'antd';
import { FC, useEffect } from 'react';
import type { TableColumns } from '@/components/type';
import useData from './useData';
import styles from './index.module.less';
import AddModal from './component/add-modal';
// import { MenuProvider } from "./context";
const Menu: FC = () => {
  const { list, loading, visible, currentId, onAddOrUpdate, refresh, setVisible, onDelMenu } =
    useData();

  const columns: TableColumns<SlideMenu>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      align: 'center',
      width: 150,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      align: 'center',
      width: 150,
      render: (_, record) => <HIcon type={record.icon} size={22} />,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      align: 'center',
      width: 150,
    },
    {
      title: '组件路径',
      dataIndex: 'path',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
      render: (_, record) => {
        if (record.type === '0') {
          return <Tag color="success">菜单</Tag>;
        } else {
          return <Tag color="default">按钮</Tag>;
        }
      },
    },
    {
      title: '权限标识',
      dataIndex: 'permission',
      align: 'center',
    },
    {
      title: '操作',
      width: 260,
      align: 'center',
      render: (_, record) => (
        <div>
          {record.type === '0' && (
            <Button type="link" onClick={() => onAddOrUpdate(record.id)}>
              添加
            </Button>
          )}
          <Button type="link" onClick={() => onAddOrUpdate(record.id)}>
            修改
          </Button>
          <Button type="link" onClick={() => onDelMenu(record.id)}>
            删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles['list-wrapper']}>
      <HTable
        bordered
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
        loading={loading}
        dataSource={list}
        onRefresh={refresh}
      >
        <div className={styles['op-wrapper']}>
          <Button type="primary" onClick={() => onAddOrUpdate()}>
            添加
          </Button>
        </div>
      </HTable>
      <AddModal
        id={currentId}
        menuList={list}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </div>
  );
};

export default Menu;

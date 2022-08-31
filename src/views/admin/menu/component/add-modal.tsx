import { HIcon } from '@/components';
import { SlideMenu } from '@/store/type';
import { Button, Col, Form, Input, message, Modal, Radio, Row, Switch, TreeSelect } from 'antd';
import { FC, useEffect, useMemo, useState } from 'react';
import { HIconSelect } from '@/components';
import { MenuDetail, MenuForm, TreeDataModel } from '../type';
import { fetchMenuInfo, fetchUpdateMenu, fetchInsertMenu } from '../service';
import useQMRequest from '@/hooks/useQMReqeust';

interface Props {
  visible: boolean;
  id?: number;
  menuList?: SlideMenu[];
  onClose: () => void;
  onRefresh?: () => void;
}

/**将菜单信息格式化成 TreeSelect需要的数据格式*/
function queryTreeData(list?: SlideMenu[]): TreeDataModel[] {
  const obj = {
    label: '根菜单',
    value: -1,
    children: format(list || []),
  };
  return [obj];

  function format(list: SlideMenu[]): TreeDataModel[] {
    return list.map((item) => {
      return {
        label: item.name,
        value: Number(item.id),
        disabled: item.type === '1',
        children: format(item.children || []),
      };
    });
  }
}

const AddModal: FC<Props> = ({ id, visible, menuList, onClose, onRefresh }) => {
  const [iconSelectVisible, setIconSelectVisible] = useState<boolean>(false);
  const [form] = Form.useForm<MenuForm>();
  const treeData = useMemo(() => queryTreeData(menuList), [menuList]);

  /**获取菜单信息 */
  const { res: menuInfo, run: queryMenuInfo } = useQMRequest((id: number) => fetchMenuInfo(id), {
    manual: true,
    onSuccess({ res }) {
      form.setFieldsValue({ ...res });
    },
  });

  /**添加 */
  const { run: onAddMenu } = useQMRequest((params: MenuForm) => fetchInsertMenu(params), {
    manual: true,
    onSuccess({ res }) {
      if (res) {
        message.success('添加成功');
        onRefresh && onRefresh();
      }
    },
  });

  /**修改 */
  const { run: onUpdateMenu } = useQMRequest((params: MenuForm) => fetchUpdateMenu(params), {
    manual: true,
    onSuccess({ res }) {
      if (res) {
        message.success('修改成功');
        onRefresh && onRefresh();
      }
    },
  });

  const onOk = async () => {
    const formdata = form.getFieldsValue();
    const flag = await form.validateFields();
    if (flag) {
      menuInfo ? onUpdateMenu({ ...menuInfo, ...formdata }) : onAddMenu({ ...formdata });
    }
  };

  const onChangeSwitch = (value: boolean) => {
    // form.setFieldsValue({
    //   keepAlive: value ? "0" : "1",
    // });
  };

  useEffect(() => {
    if (id) {
      queryMenuInfo(id);
    }
  }, [id]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <Modal
        title={menuInfo ? '修改' : '添加'}
        visible={visible}
        width={650}
        okText="确定"
        cancelText="取消"
        onCancel={onClose}
        onOk={() => onOk()}
        destroyOnClose
      >
        {/* TODO  这里如果使用initialValues会取到旧值*/}
        <Form form={form} labelCol={{ span: 5 }} labelAlign="left" preserve={false}>
          <Row>
            <Col span={12}>
              <Form.Item
                label="菜单类型"
                name="type"
                wrapperCol={{ offset: 5 }}
                rules={[{ required: true, message: '请选择菜单类型' }]}
              >
                <Radio.Group
                  // options={menuType}
                  optionType="button"
                  buttonStyle="solid"
                  // value={menuTypeValue}
                  // onChange={(e) => setMenuTypeValue(e.target.value)}
                >
                  <Radio.Button value={'0'}>左菜单</Radio.Button>
                  <Radio.Button value={'1'}>按钮</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="上级菜单"
                name="parentId"
                wrapperCol={{ offset: 2 }}
                required
                rules={[{ required: true, message: '请选择父级菜单' }]}
              >
                {treeData && (
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeData={treeData}
                  ></TreeSelect>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="图标"
            name="icon"
            required
            rules={[{ required: true, message: '请选择父级菜单' }]}
          >
            <Input
              placeholder="请选择图标"
              addonAfter={<HIcon type={form.getFieldValue('icon') || menuInfo?.icon || ''} />}
              onClick={() => setIconSelectVisible(true)}
            />
          </Form.Item>
          <Form.Item
            label="名称"
            name="name"
            required
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item
            label="路由地址"
            name="path"
            required
            rules={[{ required: true, message: '请输入路由地址' }]}
          >
            <Input placeholder="请填写路由地址" />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                label="排序"
                name="sort"
                required
                wrapperCol={{ offset: 5, span: 10 }}
                rules={[{ required: true, message: '请输入排序' }]}
              >
                <Input type="number" placeholder="值越小越靠前" />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                label="路由缓冲"
                name="keepAlive"
                wrapperCol={{ offset: 2 }}
                valuePropName="checked"
              >
                <Switch onChange={(value) => onChangeSwitch(value)}></Switch>
              </Form.Item>
            </Col> */}
          </Row>
        </Form>
      </Modal>
      {/*图标选则器 */}
      <HIconSelect
        visible={iconSelectVisible}
        onChange={(value) => {
          form.setFieldsValue({ icon: value });
          setIconSelectVisible(false);
        }}
      />
    </>
  );
};

export default AddModal;

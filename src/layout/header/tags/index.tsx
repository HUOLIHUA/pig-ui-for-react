import { FC } from "react";
import styles from "./index.module.less";
import { Button, Dropdown, Menu, Tabs } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { useLocation, useHistory } from "react-router-dom";
import { closeAllTag, closeOtherTag, closeTag } from "@/store/slice/tags";
import { DownOutlined } from "@ant-design/icons";
const Tags: FC = () => {
  const tagList = useAppSelector((state) => state.tags.tags);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const history = useHistory();

  /**切换菜单 */
  const onTag = (path: string) => {
    history.push(path);
  };

  /**关闭一个tag */
  const onCloseTag = (path: string, action: "add" | "remove") => {
    if (action === "remove") {
      tagList.map((item, index) => {
        if (item.path === path) {
          dispatch(closeTag(item));
          /**关闭当前的tag时显示前一个tag的页面 */
          history.push(tagList[index - 1].path);
        }
      });
    }
  };

  /**关闭其他tag */
  const onCloseOtherTag = () => {
    const firstTag = tagList[0];
    const currentTag = tagList.find((item) => item.path === pathname);
    dispatch(closeOtherTag([firstTag, currentTag!]));
  };

  /**关闭所有tag */
  const onCloseAllTag = () => {
    const firsTag = tagList[0];
    history.push(firsTag.path);
    dispatch(closeAllTag(firsTag));
  };

  function renderDropdownMenu() {
    return (
      <Menu className={styles["mini"]}>
        <Menu.Item key="1" onClick={() => onCloseOtherTag()}>
          关闭其他
        </Menu.Item>
        <Menu.Item key="2" onClick={() => onCloseAllTag()}>
          关闭所有
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <div className={styles["tags-wrapper"]}>
      <Tabs
        defaultActiveKey={pathname}
        activeKey={pathname}
        type="editable-card"
        hideAdd
        onChange={(e) => onTag(e)}
        onEdit={(target, action) => onCloseTag(target, action)}
      >
        {tagList.map((tag, index) => (
          <Tabs.TabPane
            tab={tag.label}
            key={tag.path}
            closable={tag.close}
          ></Tabs.TabPane>
        ))}
      </Tabs>
      <Dropdown overlay={renderDropdownMenu()} arrow>
        <Button className={styles["btn"]} type="primary">
          操作
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default Tags;

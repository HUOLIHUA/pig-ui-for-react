import { FC, useEffect } from "react";
import { Form, Input, Button } from "antd";
import styles from "./index.module.less";
import { HIcon } from "@/components";
import useData from "./useData";
const Login: FC = () => {
  const { code, loginForm, onSubmit, refreshCode } = useData();
  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles["form-wrapper"]}>
        <div className={styles["logo"]}>Admin</div>
        <Form
          form={loginForm}
          name="control-hooks"
          onFinish={onSubmit}
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <Form.Item
            name="username"
            initialValue="admin"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              className={styles["input"]}
              type="text"
              placeholder="请输入用户名"
              bordered={false}
              prefix={<HIcon type="icon-yonghu" size={20} />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            initialValue="123456"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input
              className={styles["input"]}
              type="password"
              placeholder="请输入密码"
              bordered={false}
              prefix={<HIcon type="icon-mima" size={20} />}
            />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input
              className={styles["input"]}
              type="text"
              placeholder="请输入验证码"
              maxLength={6}
              bordered={false}
              prefix={<HIcon type="icon-yanzhengma" size={18} />}
              addonAfter={
                <img
                  className={styles["code"]}
                  src={code?.codeUrl}
                  onClick={refreshCode}
                />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button className={styles["btn"]} htmlType="submit" type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

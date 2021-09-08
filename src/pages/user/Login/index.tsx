import type { IConnectState } from '@/models/connect';
import type { IConnectProps } from '@/models/connect';
import { ProFormText } from '@ant-design/pro-form';
import { Button, Card, Form } from 'antd';
import React from 'react';
import { connect, Link, history } from 'umi';
import styles from './index.less';
import type { ILoginState } from './models/login';
import type { IUserInfo } from './typing';

const LOGIN = 'login/authLogin';
interface IProps extends IConnectProps, ILoginState {}
const Login: React.FC<IProps> = (props) => {
  const { dispatch } = props;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const handleSubmit = (value: IUserInfo) => {
    dispatch({
      type: LOGIN,
      payload: value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>张大宝的鱼塘</span>
            </Link>
          </div>
        </div>

        <div className={styles.main}>
          <Card>
            <Form {...formItemLayout} onFinish={handleSubmit}>
              <ProFormText
                name="username"
                label="用户名"
                placeholder="请输入姓名"
                rules={[{ required: true, message: '用户名不能为空' }]}
              />
              <ProFormText.Password
                name="password"
                label="密码"
                placeholder="请输入密码"
                rules={[{ required: true, message: '密码不能为空' }]}
              />
              <div className={styles.btn}>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default connect(({ login }: IConnectState) => ({ ...login }))(Login);

import { ProFormText } from '@ant-design/pro-form';
import { Button, Card, Form } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';

import styles from './index.less';

const Login: React.FC = () => {
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
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
            <Form {...formItemLayout}>
              <ProFormText name="username" label="用户名" placeholder="请输入姓名" />
              <ProFormText.Password name="password" label="密码" placeholder="请输入密码" />
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

export default Login;

import { useUserInfo } from '@/hooks';
import { MS_LOGIN_TOKEN } from '@/utils/constant';
import { Button, Space } from 'antd';
import React from 'react';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { username } = useUserInfo();
  return (
    <Space className={styles.right}>
      <span>头像</span>

      <span>用户名：{username}</span>
      <Button
        type="primary"
        onClick={() => {
          window.localStorage.removeItem(MS_LOGIN_TOKEN);
          window.location.reload();
        }}
      >
        登出
      </Button>
    </Space>
  );
};
export default GlobalHeaderRight;

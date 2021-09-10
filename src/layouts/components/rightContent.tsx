import { useUserInfo } from '@/hooks';
import { MS_LOGIN_TOKEN } from '@/utils/constant';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Space } from 'antd';
import React from 'react';

interface IProps {}

const RightContent: React.FC<IProps> = (props) => {
  const { username } = useUserInfo();
  return (
    <Space>
      <Avatar style={{ backgroundColor: 'rgb(248, 114, 136)' }} icon={<UserOutlined />} />

      <span>{username}</span>
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

export default RightContent;

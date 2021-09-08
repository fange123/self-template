import React from 'react';

import { connect } from 'umi';
import { IConnectState, IConnectProps } from '@/models/connect';
import styles from './index.less';
import { Button } from 'antd';
import { MS_LOGIN_TOKEN } from '@/utils/constant';

interface IProps extends IConnectProps {}

const BasicLayout: React.FC<IProps> = (props) => {
  return (
    <div className={styles.layout}>
      header
      <Button
        onClick={() => {
          window.localStorage.removeItem(MS_LOGIN_TOKEN);
          window.location.reload();
        }}
      >
        登出
      </Button>
    </div>
  );
};

export default connect(({ user }: IConnectState) => ({
  user,
}))(BasicLayout);

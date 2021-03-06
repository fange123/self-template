import { MyConfirm } from '@/components';
import MyIcon from '@/components/MyIcon';
import Icon, { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'umi';
import styles from './styles//BasicHeader.less';
import { ReactComponent as outSvg } from '@/assets/icons/out.svg';
import logoPng from '@/assets/images/logo.png';
import { useUserInfo } from '@/hooks';
import { MS_LOGIN_TOKEN } from '@/utils/constant';
import { Header } from 'antd/lib/layout/layout';
import BasicSider from './BasicSider';
import classnames from 'classnames';

interface IProps {
  mode?: 'inline' | 'horizontal' | 'vertical';
}

const BasicHeader: React.FC<IProps> = (props) => {
  const { username } = useUserInfo();

  const { mode } = props;

  const svgProps = {
    width: '15px',
    height: '15px',
  };

  const onOk = () => {
    //! 可以写请求
    window.localStorage.removeItem(MS_LOGIN_TOKEN);
    window.location.reload();
  };

  return mode === 'vertical' ? (
    <Header className={styles.header}>
      <div className={classnames(styles.left)}>
        <Link to="/" className={styles.logo_wrapper}>
          <img src={logoPng} alt="logo" />
        </Link>
        <h3 className={styles.title}>张大宝的鱼塘</h3>
      </div>
      <div className={styles.right}>
        <span className={styles.username}>{username}</span>
        <MyConfirm
          icon={<ExclamationCircleOutlined />}
          title="提示"
          content="确认退出登陆吗？"
          onOk={onOk}
        >
          <Icon title="退出登录" component={MyIcon(outSvg, svgProps)} />
        </MyConfirm>
      </div>
    </Header>
  ) : (
    <Header
      className={classnames(mode === 'inline' ? styles.inline_header : styles.horizontal_header)}
    >
      <div className={styles.left}>
        <Link to="/" className={styles.logo_wrapper}>
          <img src={logoPng} alt="logo" />
        </Link>
        <h3 className={styles.title}>张大宝的鱼塘</h3>
        <BasicSider pathname={window.location.pathname} mode={mode} />
      </div>
      <div className={styles.right}>
        <span className={styles.username}>{username}</span>

        <MyConfirm
          icon={<ExclamationCircleOutlined />}
          title="提示"
          content="确认退出登陆吗？"
          onOk={onOk}
        >
          <Icon title="退出登录" component={MyIcon(outSvg, svgProps)} />
        </MyConfirm>
      </div>
    </Header>
  );
};

export default BasicHeader;

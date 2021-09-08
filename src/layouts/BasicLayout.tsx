import React, { useEffect } from 'react';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
// https://ant-design.gitee.io/docs/react/faq-cn#%E6%88%91%E7%9A%84%E7%BB%84%E4%BB%B6%E9%BB%98%E8%AE%A4%E8%AF%AD%E8%A8%80%E6%98%AF%E8%8B%B1%E6%96%87%E7%9A%84%EF%BC%9F%E5%A6%82%E4%BD%95%E5%88%87%E5%9B%9E%E4%B8%AD%E6%96%87%E7%9A%84%E3%80%82
import 'moment/locale/zh-cn';
import { connect, useDispatch } from 'umi';
import { IConnectState, IConnectProps } from '@/models/connect';
import styles from './styles/BasicLayout.less';

const { Content } = Layout;

interface IProps extends IConnectProps {}

const USER_INFO = 'user/getAccountInfo';

const BasicLayout: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const { children, user } = props;
  const isInLoginLayout = ['/login', '/404', '/500', '/register'].some(
    (item) => location.pathname.indexOf(item) === 0,
  );

  console.log('123');

  const getUserInfo = () => {
    dispatch({
      type: USER_INFO,
    });
  };

  useEffect(() => {
    if (!isInLoginLayout) {
      getUserInfo();
    }
  }, [isInLoginLayout]);

  // 针对登录页面，单独设置布局
  if (isInLoginLayout) {
    return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
  }

  return (
    <ConfigProvider locale={zhCN} renderEmpty={() => <div>11</div>}>
      <Layout className={styles.horizontal_layout}></Layout>
    </ConfigProvider>
  );
};

export default connect(({ user }: IConnectState) => ({
  user,
}))(BasicLayout);

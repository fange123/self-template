import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { IConnectProps } from '@/models/connect';
import BasicHeader from './components/BasicHeader';
import styles from './index.less';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import BasicSider from './components/BasicSider';
import Breadcrumbs from './components/Breadcrumbs';

export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
} & ProLayoutProps;

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
interface IProps
  extends BasicLayoutProps,
    Omit<IConnectProps, 'history' | 'loading' | 'route' | 'location'> {}
//! 解决类型不兼容

const BasicLayout: React.FC<IProps> = (props) => {
  const { children } = props;

  //! 可选水平，垂直，内敛
  const layout = 'vertical';

  return layout === 'horizontal' ? (
    <Layout className={styles.horizontal_layout}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BasicHeader mode={layout} />
        <Content className={styles.horizontal_content}>
          <Breadcrumbs />
          <div className={styles.horizontal_main}>{children}</div>
        </Content>
      </ErrorBoundary>
    </Layout>
  ) : (
    <Layout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BasicHeader mode={layout} />
        <Layout>
          <BasicSider mode={layout} pathname={window.location.pathname} />
          <Layout className={styles.main_container_wrapper} style={{ marginLeft: '160px' }}>
            <Breadcrumbs />
            <div className={styles.main_container}>{children}</div>
          </Layout>
        </Layout>
      </ErrorBoundary>
    </Layout>
  );
};

export default BasicLayout;

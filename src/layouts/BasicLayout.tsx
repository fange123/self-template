import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import React from 'react';
import { Link } from 'umi';
import logoPng from '@/assets/images/logo.png';
import type { IConnectProps } from '@/models/connect';
import BasicHeader from './components/BasicHeader';
import styles from './index.less';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

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

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
  // 深拷贝一个数组
  const newList = JSON.parse(JSON.stringify(menuList));

  return newList.map((item: { children: MenuDataItem[] }) => {
    return {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
  });
};
interface IProps
  extends BasicLayoutProps,
    Omit<IConnectProps, 'history' | 'loading' | 'route' | 'location'> {}
//! 解决类型不兼容

const BasicLayout: React.FC<IProps> = (props) => {
  const {
    children,
    location = {
      pathname: '/',
    },
  } = props;

  const layout = 'horizontal';
  // prolayout.ant.design/getting-started#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B8%83%E5%B1%80
  //   headerRender 可以自定义顶栏
  // footerRender 可以自定义页脚
  // menuRender 可以自定义菜单区域
  // menuHeaderRender 自定义的菜单头区域
  // menuExtraRender 可以为菜单增加一个额外内容，在菜单头和菜单之间

  return layout === 'horizontal' ? (
    <Layout className={styles.horizontal_layout}>
      <BasicHeader />
      <Content className={styles.horizontal_content}>
        {/* <Breadcrumbs /> */}
        <div className={styles.horizontal_main}>{children}</div>
      </Content>
    </Layout>
  ) : (
    <ProLayout
      {...props}
      logo={logoPng}
      title="张大宝"
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      // footerRender={() => defaultFooterDom}
      menuDataRender={menuDataRender}
    >
      {children}
    </ProLayout>
  );
};

export default BasicLayout;

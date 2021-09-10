import {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  PageContainer,
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import React from 'react';
import { Link } from 'umi';
import logoPng from '@/assets/images/logo.png';
import { Button } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

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
  //深拷贝一个数组
  const newList = JSON.parse(JSON.stringify(menuList));

  return newList.map((item: { children: MenuDataItem[] }) => {
    return {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
  });
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    children,
    location = {
      pathname: '/',
    },
  } = props;
  const layout = 'horizontal';
  //prolayout.ant.design/getting-started#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B8%83%E5%B1%80
  //   headerRender 可以自定义顶栏
  const headerRender = () => {
    return (
      <header className={classnames(styles.inline_header)}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo_wrapper}>
            logo
          </Link>
        </div>
        <div className={styles.right}>
          <Link to="/userInfo">
            <span className={styles.admin}>aaaa</span>
          </Link>
          icon
        </div>
      </header>
    );
  };
  // footerRender 可以自定义页脚
  // menuRender 可以自定义菜单区域
  // menuHeaderRender 自定义的菜单头区域
  // menuExtraRender 可以为菜单增加一个额外内容，在菜单头和菜单之间

  https: return layout === 'horizontal' ? (
    <ProLayout layout="top" headerRender={() => headerRender()}>
      <PageContainer>{children}</PageContainer>
    </ProLayout>
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

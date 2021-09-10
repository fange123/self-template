import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import { PageContainer } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import React from 'react';
import { Link } from 'umi';
import logoPng from '@/assets/images/logo.png';
import styles from './index.less';
import { useUserInfo } from '@/hooks';
import Icon, { ExclamationCircleOutlined } from '@ant-design/icons';
import type { IConnectProps } from '@/models/connect';
import { MyConfirm } from '@/components';
import { ReactComponent as outSvg } from '@/assets/icons/out.svg';
import MyIcon from '@/components/MyIcon';

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
    dispatch,
    location = {
      pathname: '/',
    },
  } = props;
  const { username } = useUserInfo();

  const onOk = () => {
    dispatch({
      type: 'user/logout',
    });
  };
  const svgProps = {
    width: '15px',
    height: '15px',
  };

  const layout = 'horizontal';
  // prolayout.ant.design/getting-started#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B8%83%E5%B1%80
  //   headerRender 可以自定义顶栏
  const headerRender = () => {
    return (
      <header className={styles.header_line}>
        <div className={styles.left}>
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
      </header>
    );
  };
  // footerRender 可以自定义页脚
  // menuRender 可以自定义菜单区域
  // menuHeaderRender 自定义的菜单头区域
  // menuExtraRender 可以为菜单增加一个额外内容，在菜单头和菜单之间

  return layout === 'horizontal' ? (
    <div className={styles.horizontal}>
      <ProLayout layout="top" headerRender={() => headerRender()} fixedHeader>
        <PageContainer>{children}</PageContainer>
      </ProLayout>
    </div>
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

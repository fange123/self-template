import MyIcon from '@/components/MyIcon';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
import type { IBestAFSRoute } from '../../../config/routes';
import menuRoutesData from '../../../config/routes';
import { ReactComponent as homeSvg } from '@/assets/icons/home.svg';
import { ReactComponent as homeActiveSvg } from '@/assets/icons/home_a.svg';
import { ReactComponent as listSvg } from '@/assets/icons/list.svg';
import { ReactComponent as listActiveSvg } from '@/assets/icons/list_a.svg';
import { ReactComponent as selfSvg } from '@/assets/icons/self.svg';
import { ReactComponent as selfActiveSvg } from '@/assets/icons/self_a.svg';
import styles from './styles//BasicSider.less';
import Icon from '@ant-design/icons';
import classnames from 'classnames';
import Sider from 'antd/lib/layout/Sider';

interface IProps {
  collapsed?: boolean;
  mode?: 'horizontal' | 'vertical' | 'inline';
  role?: string;
  pathname: string;
}

const mapNameToIcon: Record<string, any> = {
  home: homeSvg,
  home_active: homeActiveSvg,
  list: listSvg,
  list_active: listActiveSvg,
  my: selfSvg,
  my_active: selfActiveSvg,
};

const getCurrentActiveMenuItemKey = (pathname: string) => {
  const pathArray = pathname.split('/');
  return pathArray[2] ? `/${pathArray[1]}/${pathArray[2]}` : `/${pathArray[1]}`;
};

// 获取当前路由的父级。比如：'/threats/events' -> 'threats'
const getRouteFather = (pathname_: string) => pathname_.split('/')[1];

// 遍历拿到左侧的根菜单
const rootSubmenuKeys = menuRoutesData.map((menu) => menu.active).filter(Boolean);

const BasicSider: React.FC<IProps> = (props) => {
  const { pathname, mode } = props;

  const [openKeys, setOpenKeys] = useState<string[]>([getRouteFather(pathname)]);
  const [currentMenu, setCurrentMenu] = useState<string[]>([getCurrentActiveMenuItemKey(pathname)]);
  const { SubMenu, Item } = Menu;

  useEffect(() => {
    setCurrentMenu([getCurrentActiveMenuItemKey(pathname)]);
  }, [pathname]);

  useEffect(() => {
    setOpenKeys([getRouteFather(pathname)]);
  }, [pathname]);

  // 获取到除了login页面以外的路由
  const allRoute = menuRoutesData[1]?.routes;
  const fatherRoute = allRoute?.filter((route) => route.path !== '/');

  const getMenuItems = (pathname_: string) => {
    //! 判断一级菜单还是二级
    return fatherRoute?.map((routeItem: IBestAFSRoute) => {
      const { active, routes, name: t, path, noShowInMenu } = routeItem;
      if (noShowInMenu) return null;

      const activeMenuName = active === getRouteFather(pathname_) ? `${active}_active` : active;
      const currentActive = active === window.location.pathname.split('/')[1];
      const menuClass = currentActive ? styles.activeMenu : '';
      const icon = MyIcon(mapNameToIcon[activeMenuName || 'home'], {
        width: '18px',
        height: '18px',
      });
      if (routes) {
        return (
          <SubMenu
            key={path?.replace('/', '')}
            title={
              <Link to={path!} replace={window.location.pathname === path}>
                <Icon component={icon} />
                <span>{t}</span>
              </Link>
            }
            className={menuClass}
          >
            {routes.map(
              (item: IBestAFSRoute) =>
                !item.noShowInMenu &&
                item?.name && (
                  <Item key={item.path}>
                    <Link to={item.path!} replace={window.location.pathname === item.path}>
                      {item.name}
                    </Link>
                  </Item>
                ),
            )}
          </SubMenu>
        );
      }

      return (
        <Item key={path?.replace('/', '')} className={menuClass}>
          <Link to={path!} replace={window.location.pathname === path}>
            <Icon component={icon} />
            <span>{t}</span>
          </Link>
        </Item>
      );
    });
  };

  const handleOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1) || '';
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const menuSider = (
    <Menu
      mode={mode === 'vertical' ? 'inline' : 'horizontal'}
      theme="light"
      inlineIndent={20}
      openKeys={openKeys}
      selectedKeys={currentMenu}
      onOpenChange={handleOpenChange}
      className={classnames({ [styles.headerMenu]: mode === 'horizontal' })}
    >
      {getMenuItems(pathname)}
    </Menu>
  );

  return (
    <>
      {mode === 'vertical' ? (
        <Sider width={160} collapsedWidth={60} collapsed={false} className={styles.sider}>
          {menuSider}
        </Sider>
      ) : (
        menuSider
      )}
    </>
  );
};

export default BasicSider;

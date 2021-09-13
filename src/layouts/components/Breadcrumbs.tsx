import { Breadcrumb } from 'antd';
import type { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { Link } from 'umi';
import type { IBestAFSRoute } from '../../../config/routes';
import menuRoutesData from '../../../config/routes';
import styles from './styles/Breadcrumbs.less';

const itemRender = (route: Route, _params: any, routes: Route[], paths: string[]) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
  );
};

const Breadcrumbs = () => {
  // 排除特殊页面，不用显示面包屑
  const hideBreadcrumbList = ['/page-that-hide-bc', '/page-that-hide-bc2'];
  const hideBc = hideBreadcrumbList.includes(window.location.pathname);
  if (hideBc) return null;

  const getBreadcrumb = (): Route[] => {
    const currentBreadcrumb: Route[] = [];
    const breadcrumbs = window.location.pathname
      .split('/')
      .filter((item) => item !== '/' && !!item);

    const getItem = (index: number, routeData: IBestAFSRoute[]) => {
      if (index > breadcrumbs.length - 1) return;
      for (const { breadcrumb = '', name = '', routes } of routeData) {
        if (breadcrumb === `/${breadcrumbs[index]}`) {
          currentBreadcrumb.push({
            path: breadcrumb,
            breadcrumbName: name,
          });
          if (routes) {
            getItem(index + 1, routes);
          }
          break;
        }
      }
    };
    getItem(
      0,
      menuRoutesData[1]?.routes?.filter((route) => route.path !== '/' && !route.noShowInMenu) || [],
    );
    return currentBreadcrumb;
  };
  const routes = getBreadcrumb();

  return (
    <div className={styles.breadcrumbs_wrap}>
      <span>当前位置:</span>
      <Breadcrumb
        className={styles.breadcrumbs}
        itemRender={itemRender}
        routes={routes}
        separator=">"
      />
    </div>
  );
};

export default Breadcrumbs;

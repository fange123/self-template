export interface IBestAFSRoute {
  path?: string;
  component?: string;
  name?: string; // 兼容此写法
  icon?: string;
  // 更多功能查看
  // https://beta-pro.ant.design/docs/advanced-menu
  // ---
  // 新页面打开
  target?: string;
  // 不展示顶栏
  headerRender?: false;
  // 不展示页脚
  footerRender?: false;
  // 不展示菜单
  menuRender?: false;
  // 不展示菜单顶栏
  menuHeaderRender?: false;
  // 权限配置，需要与 plugin-access 插件配合使用
  access?: string;
  // 隐藏子菜单
  hideChildrenInMenu?: boolean;
  // 隐藏自己和子菜单
  hideInMenu?: boolean;
  // 在面包屑中隐藏
  hideInBreadcrumb?: boolean;
  // 子项往上提，仍旧展示,
  flatMenu?: boolean;
  children?: IBestAFSRoute[];
  routes?: IBestAFSRoute[];
  layout?: boolean;
  redirect?: string;
  splitMenus?: true;

  group?: boolean;
  title?: string;
  active?: string;
  breadcrumb?: string;
  exclude?: string[];
  noShowInMenu?: boolean;
  exact?: boolean;
  wrappers?: string[];
  [key: string]: any;
}

const routes: IBestAFSRoute[] = [
  //登录页面单独布局
  {
    path: '/login',
    layout: false,
    hideInMenu: true,
    component: './user/Login',
    name: '登录',
    noShowInMenu: true,
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    layout: false,
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: '首页',
        component: './home',
        active: 'home',
      },
      {
        path: '/list',
        name: '列表',
        component: './list',
        active: 'list',
      },
      {
        path: '/my',
        name: '个人简介',
        active: 'my',

        routes: [
          {
            path: '/my',
            redirect: '/my/list',
          },
          {
            path: '/my/list',
            component: './my/list',
            name: '个人列表',
          },
          {
            path: '/my/account',
            component: './my/account',
            name: '个人账户',
          },
        ],
      },

      {
        path: '/404',
        name: '找不到页面',
        component: './404',
        noShowInMenu: true,
      },
    ],
  },
];

export default routes;

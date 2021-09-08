export interface IRoute {
  path?: string,
    component?: string,
    name?: string, // 兼容此写法
    icon?: string,
    // 更多功能查看
    // https://beta-pro.ant.design/docs/advanced-menu
    // ---
    // 新页面打开
    target?: string,
    // 不展示顶栏
    headerRender?: false,
    // 不展示页脚
    footerRender?: false,
    // 不展示菜单
    menuRender?: false,
    // 不展示菜单顶栏
    menuHeaderRender?: false,
    // 权限配置，需要与 plugin-access 插件配合使用
    access?: string,
    // 隐藏子菜单
    hideChildrenInMenu?: true,
    // 隐藏自己和子菜单
    hideInMenu?: true,
    // 在面包屑中隐藏
    hideInBreadcrumb?: true,
    // 子项往上提，仍旧展示,
    flatMenu?: boolean,
    layout?:boolean
    routes?: IRoute[]
    redirect?:string

}

const routes: IRoute[] = [
  {
    path: '/login',
    layout: false,
    name: 'login',
    component: './user/Login',

  },
  {
    path: '/',
    layout: false,
    component: '../layouts/BasicLayout',
    routes:[
      {path:'/home',
    name:'home',
    component:'./home'
    }
    ]
  },


  {
    component: './404',
  },
];

export default routes

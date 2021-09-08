export interface IRoute {
  group?: boolean
  path?: string
  title?: string
  children?: IRoute[]
  active?: string
  component?: string
  breadcrumb?: string
  exclude?: string[]
  noShowInMenu?: boolean
  routes?: IRoute[]
  redirect?: string
  exact?: boolean
  wrappers?: string[],
  flatMenu?:boolean,
  layout?:boolean,
  name?:string,
  headerRender?:boolean,
  menuRender?:boolean
}

const routes: IRoute[] = [
  {
    path: '/',
    layout: false,

    name: 'login',
    component: './user/Login',

  },
  {
    path: '/home',
    layout: true,
    name: 'home',
    component: './home',
      //  headerRender:false,
    menuRender:false,
    flatMenu: false,
    noShowInMenu:true,
  },


  {
    component: './404',
  },
];

export default routes

import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { message } from 'antd';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import { MS_LOGIN_TOKEN } from './utils/constant';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
}> {
  return {
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }: any) => {
  return {
    onPageChange: (value: any) => {
      const { pathname } = value;
      const loginPath = '/login';
      // 如果没有登录，重定向到 login
      //! 简单判断，如果没有获取到用户名，重新登录
      const getToken = window.localStorage.getItem(MS_LOGIN_TOKEN);
      if (!getToken && pathname !== loginPath) {
        history.push(loginPath);
        message.warn('请先登录');
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

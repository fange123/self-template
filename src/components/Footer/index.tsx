import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const currentYear = new Date().getFullYear();
  //! links是可跳转链接，是个数组，格式如下：
  // links={[
  //           { key: 'test', title: 'layout', href: 'www.alipay.com' },
  //           { key: 'test2', title: 'layout2', href: 'www.alipay.com' },
  //         ]}
  return <DefaultFooter copyright={`${currentYear} 张大宝出品`} links={false} />;
};

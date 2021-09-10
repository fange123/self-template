import { Breadcrumb } from 'antd';

import styles from './Breadcrumbs.less';

const Breadcrumbs = (props: { routes: any }) => {
  const { routes } = props;
  return (
    <div className={styles.breadcrumbs_wrap}>
      <span>当前位置：</span>
      <Breadcrumb
        className={styles.breadcrumbs}
        itemRender={() => <div>123</div>}
        routes={routes}
        separator=">"
      />
    </div>
  );
};

export default Breadcrumbs;

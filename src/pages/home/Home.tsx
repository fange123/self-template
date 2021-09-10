import { MyTitle } from '@/components';
import classNames from 'classnames';
import React from 'react';
import styles from './index.less';

interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <div className={classNames('page_container', styles.home)}>
      <MyTitle title="首页home" haveBack />
    </div>
  );
};

export default Home;

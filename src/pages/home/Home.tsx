import { MyBarChart, MyTitle } from '@/components';
import { Button, Card } from 'antd';
import classNames from 'classnames';
import React from 'react';
import styles from './index.less';

interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <>
      <div className={classNames('page_container', styles.home)}>
        <MyTitle title="首页home" haveBack />
        <Button type="primary">百度：{ZHY}</Button>
      </div>
      <Card style={{ width: '400px' }}>
        <MyBarChart
          height={200}
          chartData={[
            { name: 'xz', value: 18 },
            { name: 'wyb', value: 20 },
          ]}
        />
      </Card>
    </>
  );
};

export default Home;

import React from 'react';
import styles from './index.less';

interface IProps {}

const Home: React.FC<IProps> = (props) => {
  return <div className={styles.home}>home</div>;
};

export default Home;

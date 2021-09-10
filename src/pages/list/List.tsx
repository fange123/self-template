import React from 'react';
import styles from './index.less';

interface IProps {}

const List: React.FC<IProps> = (props) => {
  return <div className={styles.list}>list</div>;
};

export default List;

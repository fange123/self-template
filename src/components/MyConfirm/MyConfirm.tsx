import { message, Modal } from 'antd';
import type { ModalFuncProps } from 'antd/lib/modal';
import React from 'react';
import styles from './index.less';

interface IProps extends ModalFuncProps {
  isImplement?: boolean;
  implementText?: string;
}

const { confirm } = Modal;
const MyConfirm: React.FC<IProps> = (props) => {
  const { children, content, icon, isImplement, implementText, ...confirmProps } = props;

  const handleConfirm = () => {
    if (isImplement) {
      message.warn(implementText);
    } else {
      confirm({
        ...confirmProps,
        content,
        icon,
      });
    }
  };

  return (
    <div onClick={handleConfirm} className={styles.wrapper}>
      {children}
    </div>
  );
};
export default MyConfirm;

import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';
import './index.less';

interface IProps {
  title: string | React.ReactNode;
  title_type?: string;
  haveBack?: boolean;
  handleBack?: () => void;
}

const MyTitle: React.FC<IProps> = (props) => {
  const { title, title_type, haveBack = false, children, handleBack } = props;
  const handleRouterBack = () => {
    if (handleBack) {
      handleBack();
    } else {
      // eslint-disable-next-line no-restricted-globals
      history.go(-1);
    }
  };
  return (
    <div
      className={classNames('ms_title', {
        ms_title_back: haveBack,
        ms_title_page: title_type !== 'text',
      })}
    >
      <div className="ms_title_left">
        <div className="handle_title">
          <h2
            className={classNames(
              title_type === 'text' ? 'handle_title_text' : 'handle_title_page',
            )}
          >
            {title}
          </h2>
          {children}
        </div>
        {haveBack && (
          <Button className="handle_back" type="primary" onClick={handleRouterBack} size="small">
            返回
          </Button>
        )}
      </div>
    </div>
  );
};

export default MyTitle;

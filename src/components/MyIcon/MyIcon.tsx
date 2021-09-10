import React from 'react';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const defaultProps = {
  width: '20px',
  height: '20px',
  fill: '#fff',
  className: '',
  style: {},
};

const MyIcon = (
  WrappedComponent: React.ComponentType,
  newProps?: Partial<CustomIconComponentProps>,
): React.ComponentType<any> => {
  class WrappingComponent extends React.Component {
    // eslint-disable-next-line no-restricted-syntax
    render() {
      return <WrappedComponent {...this.props} {...defaultProps} {...newProps} />;
    }
  }
  return WrappingComponent;
};

export default MyIcon;

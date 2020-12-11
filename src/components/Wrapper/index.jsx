import React from 'react';
import styles from './index.module.sass';

const Wrapper = (props) => {
  const { children, className = '', ...rest } = props;

  return (
    <div className="w-full clearfix">
      <div {...rest} className={`${styles.wrapper} ${className} `}>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;

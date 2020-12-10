import React from 'react';
import styles from './index.module.sass';

const Wrapper = (props) => {
  const { children, className = '', ...rest } = props;

  return (
    <div className="bg-gray-100 w-full h-full">
      <div {...rest} className={`${styles.wrapper} ${className} `}>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;

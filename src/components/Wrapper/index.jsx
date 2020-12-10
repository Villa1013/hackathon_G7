import React from "react";
import styles from "./index.module.sass";

const Wrapper = (props) => {
  const { children, className = "", ...rest } = props;

  return (
    <div {...rest} className={`${styles.wrapper} ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;

import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, routerProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component routerProps={routerProps} {...props} />;
      }}
    />
  );
};

export default PublicRoute;

import React from "react";
import uuidv1 from "uuid/dist/v1";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import myRoutes from "./routers";
import PublicRoute from "../components/PublicRoute";
import Page404 from "../containers/404";

const Routers = () => (
  <BrowserRouter>
    <Switch>
      {myRoutes
        .filter((route) => route.active)
        .map((item) => {
          return (
            <PublicRoute
              key={uuidv1()}
              exact
              path={item.path}
              component={item.component}
              routerProps={item.routerProps}
            />
          );
        })}

      <Route component={() => <Page404 />} />
    </Switch>
  </BrowserRouter>
);

export default Routers;

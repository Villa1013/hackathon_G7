import React from 'react';
import { Redirect } from 'react-router-dom';
import Details from '../containers/Details';
import PageNotFound from '../containers/404';
import Recommendations from '../containers/Recommendations';

const myRoutes = [
  {
    path: '/',
    active: true,
    component: () => <Redirect to="/recommendations/125576" />,
    context: null,
    routerProps: {},

  },
  {
    path: '/recommendations/:storeId',
    active: true,
    component: Recommendations,
    context: null,
    routerProps: {},
  },
  {
    path: 'recommendations/:storeId/details/:productId',
    active: true,
    component: Details,
    context: null,
    routerProps: {},
  },
  {
    path: '/404',
    active: true,
    component: PageNotFound,
    context: null,
    routerProps: {},
  },
];

export default myRoutes;

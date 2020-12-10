import Home from '../containers/Home';
import Details from '../containers/Details';
import Scraping from '../containers/Scraping';
import PageNotFound from '../containers/404';
import Recommendations from '../containers/Recommendations';

const myRoutes = [
  {
    path: '/',
    active: true,
    component: Recommendations,
    context: null,
    routerProps: {},
  },
  {
    path: '/scraping',
    active: true,
    component: Scraping,
    context: null,
    routerProps: {},
  },
  {
    path: '/:productId',
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

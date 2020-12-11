import { APIResquest } from '../api';
import { URL_API } from './urls';

export const getLastOrders = (storeId) => new Promise((resolve, reject) => {
  APIResquest({
    uri: `${URL_API}orders-detail `,
    method: 'POST',
    data:
    {
      storeId,
    },
  }).then((values) => {
    resolve(values);
  }).catch((e) => {
    reject(e);
  });
});

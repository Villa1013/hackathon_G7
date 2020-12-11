import { APIResquest } from '../api';
import { URL_API } from './urls';

export const getInfoStore = (storeId) => new Promise((resolve, reject) => {
  APIResquest({
    uri: `${URL_API}store-info`,
    method: 'POST',
    data:
    {
      id: storeId,
    },
  }).then((values) => {
    resolve(values[0]);
  }).catch((e) => {
    console.error(e);
    reject(e);
  });
});

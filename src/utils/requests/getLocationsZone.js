import { APIResquest } from '../api';
import { URL_API } from './urls';

export const getLocationsZone = (storeId) => new Promise((resolve, reject) => {
  APIResquest({
    uri: `${URL_API}zone-by-store `,
    method: 'POST',
    data:
    {
      id: storeId,
    },
  }).then((values) => {
    resolve(values);
  }).catch((e) => {
    reject(e);
  });
});

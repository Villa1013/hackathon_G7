import { APIResquest } from '../api';
import { URL_API } from './urls';

export const postMap = (storeReferenceId, zoneId, priceLevel) => new Promise((resolve, reject) => {
  APIResquest({
    uri: `${URL_API}order-byzone-byday`,
    method: 'POST',
    data:
    {
      storeReferenceId: storeReferenceId,
      zoneId: zoneId,
      priceLevel: priceLevel
    },
  }).then((values) => {
    resolve(values);
  }).catch((e) => {
    console.error(e);
    reject(e);
  });
});

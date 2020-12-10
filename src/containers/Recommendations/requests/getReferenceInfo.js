/* eslint-disable import/prefer-default-export */
import { APIResquest } from '../../../utils/api';

export const getReferenceInfo = (storeId, storeReferenceId) => new Promise((resolve, reject) => {
  APIResquest({
    uri: `https://catalogue.chiper.co/store/${storeId}/available-inventory/recommended/info/${storeReferenceId}`,
    method: 'GET',
  }).then((resp) => {
    console.log('endpoint', resp);
    resolve(resp);
  }).catch((e) => {
    console.error(e);
    reject(e);
  });
});

/* eslint-disable import/prefer-default-export */
import { APIResquest } from '../api';
import { URL_API_CATALOG } from './urls';

export const getReferenceInfo = (storeId, storeReferenceId) => new Promise((resolve, reject) => {
  APIResquest({
    uri: `${URL_API_CATALOG}store/${storeId}/available-inventory/recommended/info/${storeReferenceId}`,
    method: 'GET',
  }).then((resp) => {
    console.log('endpoint', resp);
    resolve(resp);
  }).catch((e) => {
    console.error(e);
    reject(e);
  });
});

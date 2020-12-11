/* eslint-disable import/prefer-default-export */
import { URL_API } from './urls';
import { APIResquest } from '../api';

const DEFAULT_STORE_ID = 125576;

export const getHotItems = (storeId = DEFAULT_STORE_ID) => new Promise((resolve, reject) => {
  APIResquest({
    uri: `${URL_API}recommendation-data`,
    method: 'POST',
    data:
    {
      storeId,
    },
  }).then((resp) => {
    console.log('endpoint', resp);
    resolve(resp);
  }).catch((e) => {
    console.error(e);
    reject(e);
  });
});

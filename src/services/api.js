import axios from "axios";

const URL_API = process.env.REACT_APP_API_URL;

export const get = path => {
  return axios.get(`${URL_API}${path}`);
};

export const post = (path, params) => {
  return axios.post(`${URL_API}${path}`, params);
};

export const put = (path, params) => {
  return axios.put(`${URL_API}${path}`, params);
};

export const patch = (path, params) => {
  return axios.patch(`${URL_API}${path}`, params);
};
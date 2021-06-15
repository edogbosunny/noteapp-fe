import axios from 'axios';
import { BASEURL } from "@env"

// move the base url to an env file...
const instance = axios.create({
  baseURL:
  BASEURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export const setToken = (token) => {
  let parsedToken = `Bearer ${token}`

  instance.defaults.headers.common.authorization = parsedToken;
};

// );
export default instance;

import axios from "axios";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Axios = axios.create({
  baseURL: `https://patolsima-api-19f65176eefa.herokuapp.com/`,
  headers: { "content-type": "application/json"},
});

Axios.interceptors.request.use(async (config) => {
  const token = window.localStorage.getItem("access");
  const newAcessToken = window.localStorage.getItem("newAcessToken");
 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (newAcessToken) {
    config.headers.Authorization = `Bearer ${newAcessToken}`;
  }
  
  return config;
});

export default Axios;

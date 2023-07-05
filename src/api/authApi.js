import axios from "axios";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



  const Axios = axios.create({
    baseURL: `${REACT_APP_BACKEND_URL}`,
    headers: { "content-type": "application/json" },
  });
  export default Axios;

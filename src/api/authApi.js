import axios from "axios";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


  const Axios = axios.create({
    baseURL: `${REACT_APP_BACKEND_URL}`,
    headers: { "content-type": "application/json" },
  });

   Axios.interceptors.request.use(async config => {
      const token = window.localStorage.getItem("access");
      //refresh
     if (token){
         config.headers.Authorization = `Bearer ${token}`;
     } 
 /* if(refresh){
      config.headers.Authorization = `Bearer ${refresh}`;
     }*/
     return config
   })
  
  export default Axios;

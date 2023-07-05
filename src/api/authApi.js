import axios from "axios";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

<<<<<<< HEAD
=======

>>>>>>> 21ee66a46830f329f7cef63d216b28f7d804a4e5

  const Axios = axios.create({
    baseURL: `${REACT_APP_BACKEND_URL}`,
    headers: { "content-type": "application/json" },
  });
<<<<<<< HEAD

   Axios.interceptors.request.use(async config => {
      const token = window.localStorage.getItem("access");
      const refresh = window.localStorage.getItem("refresh");
      //refresh
     if (token){
         config.headers.Authorization = `Bearer ${token}`;
     } 
  /*   if(refresh){
      config.headers.Authorization = `Bearer ${refresh}`;
     }*/
     return config
   })
  
=======
>>>>>>> 21ee66a46830f329f7cef63d216b28f7d804a4e5
  export default Axios;

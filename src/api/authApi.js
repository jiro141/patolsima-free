import axios from "axios";
import Cookies from "js-cookie";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


  const Axios = axios.create({
    baseURL: `${REACT_APP_BACKEND_URL}`,
    headers: { "content-type": "application/json" },
  });

  
  
   Axios.interceptors.request.use(async config => {
      const token = window.localStorage.getItem("access");
     if (token){
         config.headers.Authorization = `Bearer ${token}`;
     } return config
   })
  
  export default Axios;













// // console.log(Cookies.get('access'));
// export const authApi = axios.create(
//     {
//         // withCredentials: true,
//         baseURL: REACT_APP_BACKEND_URL,
//     }
// );

// export const apiURLs = {

//     pacientes: {
//         getPacientes: { path: 'v1/core/pacientes/', method: 'GET' },
//         getPacienteDetail: { path: 'v1/core/pacientes/:id/', method: 'GET' },
//         crearPaciente: { path: 'v1/core/pacientes/', method: 'POST' },
//         actualizarPaciente: { path: 'v1/core/pacientes/:id/', method: 'PUT' },
//         borrarPaciente: { path: 'v1/core/pacientes/:id/', method: 'DELETE' },
//     }
// };

// const defaultErrorHandler = (error) => {
//     console.error(error);
// };

 


// export const makeRequest = async (method, path, params, data) => {
//     const token = null;
//         console.log(token);
//     let requestObj = {
//         method: method,
//         path: path
//     }
//     console.log(requestObj);
//     if (method === 'POST' || method === 'PUT') {
//         requestObj.config.headers['Content-Type'] = 'application/json'
//         requestObj.config.data = data
//     }
//     if (params != undefined) {
//         Object.entries(params.pathParams || {}).forEach(
//             ([paramName, paramValue]) => {
//                 path = path.replace(`:${paramName}`, encodeURIComponent(paramValue));
//             }
//         );
//         if (params.queryParams != undefined && Object.keys(params.queryParams).length > 0) {
//             const encodeQueryParams = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
//             path = (path + '?' + encodeQueryParams(params.queryParams));
//         }
//         requestObj.url = path;
//         if (params.payload != undefined) {
//             requestObj.data = params.payload
//         }
//     }

//     try {
//         const response = await authApi.request(requestObj)
//         if (response) {
//             return response
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };



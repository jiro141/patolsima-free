import axios from "axios";
import Cookies from "js-cookie";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// axios.defaults.withCredentials = true;
axios.defaults.headers.common = {'Authorization': `Bearer ${Cookies.get('access')}`}
console.log(Cookies.get('access'));
export const authApi = axios.create(
    {
        baseURL: REACT_APP_BACKEND_URL,
    }
);

const apiURLs = {
    pacientes: {
        getPacientes: {path: 'v1/core/pacientes/', method: 'GET'},
        getPacienteDetail: {path: 'v1/core/pacientes/:id/', method: 'GET'},
        crearPaciente: {path: 'v1/core/pacientes/', method: 'POST'},
        actualizarPaciente: {path: 'v1/core/pacientes/:id/', method: 'PUT'},
        borrarPaciente: {path: 'v1/core/pacientes/:id/', method: 'DELETE'},
    }
};
const defaultErrorHandler = (error) => {
    console.error(error);
};


export const makeRequest  = async (method, path, params, onSuccess, onError) => {
    // console.log(method, path, params);
    // if (condition) {
        
    // } // Aqui obtiene el token para hacer el reques
    let requestObj = {
        method: method
    }
    
    if(method === 'POST' || method === 'PUT'){
        requestObj.config.headers['Content-Type']='application/json'
    }

    

    if(params != undefined){
        Object.entries(params.pathParams || {}).forEach(
            ([paramName, paramValue]) => {
                path = path.replace(`:${paramName}`, encodeURIComponent(paramValue));
            }
        );
        if(params.queryParams != undefined && Object.keys(params.queryParams).length > 0){
            const encodeQueryParams = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
            path = (path + '?' + encodeQueryParams(params.queryParams));
        }
        requestObj.url = path;
        if(params.payload != undefined){
            requestObj.data = params.payload
        }
    }
    
    // console.log(requestObj);
   
        try{
            const response = await authApi.request(requestObj)
            if (response) {
                return response  
            }
        }catch(error){
            console.log(error);
        }
};


// Como usar la vaina?...

// Por ejemplo: Necesito obtener los pacientes y meterlos en el componente

const actualizarListaPacientes = (data) => {
    // Lo que sea que haya que hacer aqui para meter la data de los pacientes en la lista
}

const mostrarErrorListaPacientes = (error) => {
    // Mostrar modal de que hubo un error comunicandose con la API, etc.
}

// Usar la abstraccion sobre la api...

// import 'makeRequest desde el archivo de la api';
const ruta = apiURLs.pacientes.getPacientes;
makeRequest(
    ruta.path, 
    ruta.method, 
    {},
    actualizarListaPacientes, // onSuccess (llamada exitosa)
    mostrarErrorListaPacientes // onError (la cagamos amiguito)
);


// Ejemplo de buscar un paciente por cedula o lo que sea

// makeRequest(
//     ruta.path, 
//     ruta.method, 
//     {
//         queryParams: {
//             search: valodCampodeBusqueda // Lo que sale del campo de texto
//         }
//     },
//     actualizarListaPacientes, // onSuccess (llamada exitosa)
//     mostrarErrorListaPacientes // onError (la cagamos amiguito)
// );

// Ejemplo con actualizar un paciente
// const ruta = apiURLs.pacientes.actualizarPaciente;
// makeRequest(
//     ruta.path, 
//     ruta.method, 
//     {
//         pathParams: {
//             id: pacienteId // el id del paciente seleccionado
//         },
//         payload: {
//             // Los campos para actualizar
//         }
//     },
//     (data) => {
//         // Actualizar el estado y seguir a la vista de medico
//     }, 
//     () => {
//         // onError (la cagamos amiguito)
//     } 
// );
//listar medicos metodo get
import Axios from "api/authApi";

export const getMedicosList= async (endpoint) => {
    try {
        const response = await Axios.get(`/v1/core/medicos/`)
        return response.data.results;       
    } catch (error) {
        console.log(error);
    }
}

//detallado medicos metodo get
export const getMedicosDetail = async (id) => {
    try {
        const response = await Axios.get(`/v1/core/medicos/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
//guardar pacietes metodo post
export const postMedicos = async (formData) => {
    try {
        const response = await Axios.post(`/v1/core/medicos/`,formData)
       console.log(response);
    } catch (error) {
        console.log(error);
    }
}
//guardar pacietes metodo put
export const putMedicos = async (id,registro) => {
    try {
        const response = await Axios.put(`/v1/core/medicos/${id}/`,registro)
       console.log(response);
    } catch (error) {
        console.log(error);
    }
}
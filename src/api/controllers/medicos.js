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
        return response.data
       
    } catch (error) {
        console.log(error);
    }
}
//guardar pacietes metodo put
export const putMedicos = async (formData) => {
    try {
        const response = await Axios.put(`/v1/core/medicos/${formData.id}/`,formData)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//delete medico

export const deleteMedico = async (id) => {
  
    try {
        const response = await Axios.delete(`/v1/core/medicos/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
//listar pacientes metodo get
import Axios from "api/authApi";
import { object } from "yup";


export const getPacientesList = async (endpoint) => {
    try {
        const response = await Axios.get(`/v1/core/pacientes/`)
        return response.data.results;
    } catch (error) {
        console.log(error.message);
    }
}
export const getPacientesListByCi = async ({ searchci }) => {
    try {
        const response = await Axios.get(`/v1/core/pacientes/?ci=${searchci}`)
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}

//detallado pacientes metodo get
export const getPacientesDetail = async (id) => {
    try {
        const response = await Axios.get(`/v1/core/pacientes/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//guardar pacietes metodo post
export const postPacientes = async (data) => {

    try {
        const response = await Axios.post(`/v1/core/pacientes/`, data)
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }

}
//guardar pacietes metodo put
export const putPacientes = async (id, registro) => {
    try {
        const response = await Axios.put(`/v1/core/pacientes/${id}/`, registro);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};



//eliminar pacientes metodo delete 
export const deletePaciente = async (id) => {
    try {
        const response = await Axios.delete(`/v1/core/pacientes/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
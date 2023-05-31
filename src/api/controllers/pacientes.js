//listar pacientes metodo get
import Axios from "api/authApi";

export const getPacientesList = async (endpoint) => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const response = await Axios.get(`/v1/core/pacientes/`)
        // console.log(response);
        return response.data.results;

    } catch (error) {
        console.log(error);
    }
}

//detallado pacientes metodo get
export const getPacientesDetail = async (id) => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const response = await Axios.get(`/v1/core/pacientes/${id}`)
        console.log(response.data.results);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//guardar pacietes metodo post
export const postPacientes = async (formData) => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const response = await Axios.post(`/v1/core/pacientes/`,formData)
       console.log(response);
    } catch (error) {
        console.log(error);
    }
}

//eliminar pacientes metodo delete 
export const deletePaciente = async(id)=>{
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const response = await Axios.delete(`/v1/core/pacientes/${id}`)
    } catch (error) {
        console.log(error);
    }
}
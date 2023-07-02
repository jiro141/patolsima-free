//listar pacientes metodo get
import Axios from "api/authApi";


export const getPacientesList = async (endpoint) => {
    try {
        const response = await Axios.get(`/v1/core/pacientes/`)
         console.log(response.data);
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
export const postPacientes = async ({ci,nombres,apellidos,fecha_nacimiento,direccion,email,telefono_fijo,telefono_celular,sexo}) => {
    try {
        const response = await Axios.post(`/v1/core/pacientes/`, {
            ci,
            nombres,
            apellidos,
            fecha_nacimiento,
            direccion,
            email,
            telefono_fijo,
            telefono_celular,
            sexo
        })
        console.log(response);
        return response.data.id;
    } catch (error) {
        console.log(error);
    }

}
//guardar pacietes metodo put
export const putPacientes = async (id,registro) => {  
    try {
        const response = await Axios.put(`/v1/core/pacientes/${id}/`,registro) // para el put tambien tengo que enviar un body
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

//eliminar pacientes metodo delete 
export const deletePaciente = async (id) => {
    try {
        const response = await Axios.delete(`/v1/core/pacientes/${id}`)
    } catch (error) {
        console.log(error);
    }
}
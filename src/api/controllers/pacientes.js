//listar pacientes metodo get
import Axios from "api/authApi";

export const getPacientesList = async (endpoint) => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    console.log(token);
    try {
        const response = await Axios.get(`/v1/core/pacientes/`)
        return response.data.results;
    } catch (error) {
        console.log(error.response);
    }
}

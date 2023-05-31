//listar facturas metodo get
import Axios from "api/authApi";

export const getFacturasList= async (endpoint) => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/`)
        console.log(response);
        return response.data.results;
        
    } catch (error) {
        console.log(error);
    }
}
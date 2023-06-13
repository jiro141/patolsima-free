//listar facturas metodo get
import Axios from "api/authApi";

export const getFacturasList= async () => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    // console.log(token);
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/`)
        // console.log(response);
        // console.log(response.data);
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const getFacturasListSinPagar= async () => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    // console.log(token);
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/?pagada=false`)
        // console.log(response);
        // console.log(response.data);
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const getFacturasListSinProcesar= async () => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    // console.log(token);
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/?confirmada=false`)
        // console.log(response);
        // console.log(response.data);
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
import Axios from "api/authApi";

export const getCambio= async () => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const response = await Axios.get('/v1/facturacion/cambiodeldia')
        return response.data.usd_bs;
        
    } catch (error) {
        console.log(error);
    }
}
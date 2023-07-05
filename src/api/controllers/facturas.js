//listar facturas metodo get
import Axios from "api/authApi";

export const getFacturasList= async () => {
<<<<<<< HEAD
    // console.log(token);
=======
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
>>>>>>> 21ee66a46830f329f7cef63d216b28f7d804a4e5
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/`)
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const getFacturasDetail= async (id) => {
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
//factura a terceros
export const putFacturaTerceros= async (id,data) => {
    try {
        const response = await Axios.put(`/v1/facturacion/ordenes/${id}/`,data)
        // return response.data;
    } catch (error) {
        console.log(error);
    }
}
//abonar 
export const postAbonar= async (data) => {
    try {
        const response = await Axios.post(`/v1/facturacion/pagos/`,data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
//confirmar
export const postConfirmar= async (id) => {
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/${id}/confirmar/`)
        console.log(response);
        // return response.data;
    } catch (error) {
        console.log(error);
    }
}
//nota de pago
export const postNotaPago= async (id) => {
<<<<<<< HEAD
=======
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    console.log(id);
>>>>>>> 21ee66a46830f329f7cef63d216b28f7d804a4e5
    try {
        const response = await Axios.get(`/v1/facturacion/pagos/${id}/nota_de_pago/`)
        return response;
    } catch (error) {
        console.log(error);
    }
}
//agregar monto put
export const putMonto= async (id,data) => {
    try {
        const response = await Axios.put(`/v1/facturacion/itemsorden/${id}/`,data)
        return response;
    } catch (error) {
        console.log(error);
    }
}
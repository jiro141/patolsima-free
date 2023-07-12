//listar facturas metodo get
import Axios from "api/authApi";

export const getFacturasList= async () => {
    // console.log(token);
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
//post ordenes
export const postOrdenes= async (data) => {
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/`,data)
         return response.data;
    } catch (error) {
        console.log(error);
    }
}

//factura a terceros
export const putFacturaTerceros= async (id,data) => {
    try {
        const response = await Axios.put(`/v1/facturacion/ordenes/${id}/`,data)
         return response.data;
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
//delete orden
export const deleteOrden= async (id) => {
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/${id}`)
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
         return response.data;
    } catch (error) {
        console.log(error);
    }
}
//nota de pago
export const postNotaPago= async (id) => {
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
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
//filterss
export const getFacturasListConfirm= async () => {
    // console.log(token);
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/?confirmada=true`)
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const getFacturasListNoConfirm= async () => {
    // console.log(token);
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/?pagada=false&confirmada=false`)
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
    console.log(data);
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/`,data)
        console.log(response);
         return response.data;
    } catch (error) {
        console.log(error);
    }
}

//factura a terceros
export const putFacturaTerceros= async (id,data) => {
    console.log(data, "data de factura a tercero");
    console.log(id,"id de el cliente");
    try {
        const response = await Axios.put(`/v1/facturacion/clientes/${id}/`,data)
         return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const postFacturaTerceros= async (data) => {
    console.log(data)
    try {
        const response = await Axios.post(`/v1/facturacion/clientes/`,data)
        console.log( response.data)
         return response.data;
    } catch (error) {
        console.log(error);
    }
}
//factura terceros put client->
export const putClientFactura= async (id,data) => {
    console.log(data)
    try {
        const response = await Axios.put(`/v1/facturacion/clientes/${id}/`,data)
        console.log( response.data)
         return response.data;
    } catch (error) {
        console.log(error);
    }
}

//facturas para terceros->

//https://patolsima-api-19f65176eefa.herokuapp.com/v1/facturacion/clientes/idCliente/
//patolsima-ordenes-metodos cliente
//archivar orden no se pueden archivar ordenes que no esten pagas 

//ordenes filtrar por 
//abonar 
export const postAbonar= async (data) => {
    try {
        const response = await Axios.post(`/v1/facturacion/pagos/`,data)
        console.log(response)
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
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
//Generar factura
export const postFactura= async (id,data) => {
    console.log(id,data)
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/${id}/factura/`,data)
        return response.data.confirm.s3_file;
    } catch (error) {
        console.log(error);
    }
}

//Generar Recibo
export const postRecibo= async (id,data) => {
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/${id}/recibo/`,data);
        return response.data.confirm.s3_file;
    } catch (error) {
        console.log(error);
    }
}

export const getNotadePago= async (id) => {
    try {
        const response = await Axios.get(`/v1/facturacion/pagos/${id}/nota_de_pago/`);
        return response.data.s3_file;
    } catch (error) {
        console.log(error);
    }
}

//Archivar orden
export const postArchivar= async (id,data) => {
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/${id}/archivar/`,{})
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


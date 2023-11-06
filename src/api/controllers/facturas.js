//listar facturas metodo get
import Axios from "api/authApi";

export const getFacturasList = async () => {

    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/`)
        // console.log('lista',response.data.results);
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
//filterss
export const getFacturasListConfirm = async () => {
    // console.log(token);
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/?confirmada=true`)
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const getFacturasListNoConfirm = async () => {
    // console.log(token);
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/?pagada=false&confirmada=false`)
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}

export const getFacturasDetail = async (id) => {
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
//post ordenes
export const postOrdenes = async (data) => {
    console.log(data);
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/`, data)
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

//search ci for terceros
export const getOrdenesByCi = async (ci) => {
    // console.log(ci, 'ci desde el controladosr');
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/?search=${ci}`)
        // console.log(response.data.results, ' controlador');
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const getOrdenListBySearch = async ({ search }) => {
    // console.log('desde el controlador facturas',search,'hola')
    try {
        const response = await Axios.get(`/v1/facturacion/ordenes/?search=${search}`);
        // console.log(response.data.results,'resultado');
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}

//factura a terceros
export const putFacturaTerceros = async (id, data) => {

    try {
        const response = await Axios.put(`/v1/facturacion/ordenes/${id}/`, data)
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//put orden update before orden pagada=== true
export const putChangeIdOrdenClient = async (id, data) => {

    try {
        const response = await Axios.put(`/v1/facturacion/ordenes/${id}/`, data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const postFacturaTerceros = async (data) => {
    // console.log(id, data)
    try {
        const response = await Axios.post(`/v1/facturacion/clientes/`, data)
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const postCreateClient = async (data)=>{
    console.log(data);
    try {
        const response = await Axios.post(`/v1/facturacion/clientes/`,data)
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

//factura terceros put client->
export const putClientFactura = async (id, data) => {
    console.log(id, data)
    try {
        const response = await Axios.put(`/v1/facturacion/clientes/${id}/`, data)
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

//facturas para terceros->

//https://patolsima-api-19f65176eefa.herokuapp.com/v1/facturacion/clientes/idCliente/
//patolsima-ordenes-metodos cliente
//archivar orden no se pueden archivar ordenes que no esten pagas 

//ordenes filtrar por 
//abonar 
export const postAbonar = async (data) => {
    try {
        const response = await Axios.post(`/v1/facturacion/pagos/`, data)
        // console.log(response)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
//delete orden
export const deleteOrden = async (id) => {
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//confirmar
export const postConfirmar = async (id) => {
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/${id}/confirmar/`)
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
//nota de pago
export const postNotaPago = async (id) => {
    try {
        const response = await Axios.get(`/v1/facturacion/pagos/${id}/nota_de_pago/`)
        return response;
    } catch (error) {
        console.log(error);
    }
}
//agregar monto put
export const putMonto = async (id, data) => {
    try {
        const response = await Axios.put(`/v1/facturacion/itemsorden/${id}/`, data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
//Generar factura
export const postFactura = async (id, data) => {
    // console.log(id, data)
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/${id}/factura/`, data)
        return response.data.confirm.s3_file;
    } catch (error) {
        console.log(error);
    }
}

//Generar Recibo
export const postRecibo = async (id, data) => {
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/${id}/recibo/`, data);
        return response.data.confirm.s3_file;
    } catch (error) {
        console.log(error);
    }
}

export const getNotadePago = async (id) => {
    try {
        const response = await Axios.get(`/v1/facturacion/pagos/${id}/nota_de_pago/`);
        return response.data.s3_file;
    } catch (error) {
        console.log(error);
    }
}

//Archivar orden
export const postArchivar = async (id, data) => {
    try {
        const response = await Axios.post(`/v1/facturacion/ordenes/${id}/archivar/`, {})
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
//obtener clientes 
export const getClientByCi = async ({searchci}) => {
    console.log(searchci, 'controlador');
    try {
        const response = await Axios.get(`/v1/facturacion/clientes/?search=${searchci}`)
        console.log(response.data.results, 'respuesta');
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const getClient = async (search, index) => {
    // console.log(index, 'index');
    try {
        const response = await Axios.get(`/v1/facturacion/clientes/?search=${search}`)
        return response.data.results[index];
    } catch (error) {
        console.log(error);
    }
}
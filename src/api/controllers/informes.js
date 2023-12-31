import Axios from "api/authApi";
//post create informes 
export const postInformes= async (formData) => {

    console.log(formData)
    try {
        const response = await Axios.post(`/v1/core/informes/`, formData)
        console.log(response.data);
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

//informe list 
export const getListInforme= async () => {
    try {
        const response = await Axios.get(`/v1/core/informes/`)
        // console.log(response.data.results);
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const putInforme= async (id,data) => {
    console.log(id,data);
    try {
        const response = await Axios.put(`/v1/core/informes/${id}/`,data)
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}
//informe update  
export const updateInforme= async (id,formData) => {

    // console.log(formData);
    try {
        const response = await Axios.put(`/v1/core/informes/${id}/`, formData);

        console.log(response.data);
         return response.data;
    } catch (error) {
        console.log(error);
    }
}
//informe detail 
export const getInformesDetail= async (id) => {

    try {
        const response = await Axios.get(`/v1/core/informes/${id}/`);

        console.log(response.data);
         return response.data;
    } catch (error) {
        console.log(error);
    }
}
//informe preview
export const getInformePreview= async (id) => {

    try {
        const response = await Axios.get(`/v1/core/informes/${id}/pdf_preview/`,{
            responseType: "blob",
        });
        const pdfBlobUrl = URL.createObjectURL(response.data);
         return pdfBlobUrl;
    } catch (error) {
        console.log(error);
    }
}
//completar informe (admin)
export const completeInforme= async (id) => {

    try {
        const response = await Axios.put(`/v1/core/informes/${id}/completado/`);
        console.log(response);
         return response.data;
    } catch (error) {
        console.log(error);
    }
}
//generate informe complete (send wp)
export const generateInformeCompletePdf= async (id) => {

    try {
        const response = await Axios.get(`/v1/core/informes/${id}/generate_pdf/`);
        console.log(response);
         return response.data;
    } catch (error) {
        console.log(error.message);
    }
}
export const getInformesListConfirm= async () => {
    // console.log(token);
    try {
        const response = await Axios.get(`/v1/core/informes/?archived=false&aprobado=true&completado=true`)
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const getInformesList= async () => {
    // console.log(token);
    try {
        const response = await Axios.get(`/v1/core/informes/`)
        console.log(response);
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
//get list by search
export const getInformesListBySearch= async ({search}) => {
    // console.log('desde el controlador',search)
    try {
        const response = await Axios.get(`/v1/core/estudios/?informe_existe=true&search=${search}`)
        // console.log(response.data.results,'hola controlador');
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const getInformesListNotConfirm= async () => {
    // console.log(token);/v1/core/informes/?archived=false&aprobado=true&completado=true
    try {
        const response = await Axios.get(`/v1/core/informes/?aprobado=false&completado=false`)
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
//get informes priority hight ?completado=false&aprobado=true
export const getInformesListHightPriority= async () => {
    // console.log(token); ?completado=false&aprobado=true
    try {
       
        const response = await Axios.get(`/v1/core/informes/?archived=false&prioridad=ALTA&aprobado=false&completado=false`)
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const getInformesListMediaPriority= async () => {
    // console.log(token); ?completado=false&aprobado=true
    try {
        const response = await Axios.get(`/v1/core/informes/?archived=false&prioridad=MEDIA&completado=false&aprobado=false`)
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const getInformesListLowPriority= async () => {
    // console.log(token);
    try {
        const response = await Axios.get(`/v1/core/informes/?archived=false&prioridad=BAJA&completado=false&aprobado=false`)
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}

//aprobar informe (patolgo)
export const aprobarInforme= async (id) => {

    try {
        const response = await Axios.put(`/v1/core/informes/${id}/aprobar/`);
        console.log(response.data);
         return response.data;
    } catch (error) {
        console.log(error.response.data);
       // return error.response.data
    }
}
//history informe
export const historyInforme= async (id) => {

    try {
        const response = await Axios.put(`/v1/core/informes/${id}/history/`);
        console.log(response.data);
         return response.data;
    } catch (error) {
        console.log(error);
    }
}

//informes anteriores
export const lastInformes= async (id) => {
    console.log(id, 'id informe');

    try {
        const response = await Axios.get(`/v1/core/informes/?estudio__paciente_id=${id}`);
        console.log(response.data);
         return response.data.results;
    } catch (error) {
        console.log(error);
    }
}

//history informes
export const HistoryInformes= async (id) => {
    console.log(id);

    try {
        const response = await Axios.get(`/v1/core/informes/${id}/history/`);
        console.log(response.data);
         return response.data;
    } catch (error) {
        console.log(error);
    }
}




export const deleteInforme = async (id) => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const response = await Axios.delete(`/v1/core/informes/${id}/`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}



//filtros para administrador
export const getInformesCompletados = async () => {
   // const token = localStorage.getItem("access");
   // Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const response = await Axios.get('/v1/core/informes/?completado=false&aprobado=true');
        console.log(response);
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
export const getInformesNoCompletados = async () => {
  
    try {
        const response = await Axios.get('/v1/core/informes/?completado=false&aprobado=false');
        console.log(response);
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}

export const getInformesListByCode = async ({search}) => {
   console.log('desde constrolador', search);
    try {
        const response = await Axios.get(`/v1/core/informes/?estudio__codigo=${search}`);
        console.log('desde controllador ',response);
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}

export const postIHQ = async (data) => {
    try {
        const response = await Axios.post('/v1/core/resultados-inmunostoquimica/',data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const putIHQ = async (idResult,data) => {
    console.log(data);
    try {
        const response = await Axios.put(`/v1/core/resultados-inmunostoquimica/${idResult}/`,data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}
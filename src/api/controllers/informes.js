import Axios from "api/authApi";
//post create informes 
export const postInformes= async (formData,id) => {
    console.log(formData)
    try {
        const response = await Axios.post(`/v1/core/informes/`, formData)
        console.log(response.data);
        return response;
    } catch (error) {
        console.log(error);
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
//completar informe (patologo)
export const completeInforme= async (id) => {

    try {
        const response = await Axios.put(`/v1/core/informes/${id}/completado/`);
        console.log(response.data);
         return response.data;
    } catch (error) {
        console.log(error);
    }
}
//aprobar informe (admin)
export const aprobarInforme= async (id) => {

    try {
        const response = await Axios.put(`/v1/core/informes/${id}/aprobar/`);
        console.log(response.data);
         return response.data;
    } catch (error) {
        console.log(error);
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


export const deleteInforme = async () => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const response = await Axios.delete(`/v1/core/informes/${id}/`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}
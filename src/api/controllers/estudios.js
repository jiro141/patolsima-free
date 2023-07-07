import Axios from "api/authApi";

//guardar estudio metodo post
export const postStudies = async (formData) => {
    //console.log(formData)
    
    try {
        const response = await Axios.post(`/v1/core/estudios/`, formData)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
//muestra
export const postMuestra = async (formData) => {   
    try {
        const response = await Axios.post(`/v1/core/muestras/`, formData)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
//adjunto
export const postMuestraAdjunto = async (id,formData) => {   
    try {
        const response = await Axios.post(`/v1/core/estudios/${id}/adjuntos/`, formData)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const studiesDetail = async (id) => {
    try {
        const response = await Axios.get(`/v1/core/estudios/${id}`)
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const getStudiesList = async () => {
    try {
        const response = await Axios.get(`/v1/core/estudios/`)
        // console.log(response.data.results);
        return response.data.results
    } catch (error) {
        console.log(error);
    }
}
export const getStudiesDetail = async (id) => {
    try {
        const response = await Axios.get(`/v1/core/estudios/${id}/`)
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
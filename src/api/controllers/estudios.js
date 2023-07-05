import Axios from "api/authApi";

//guardar estudio metodo post
export const postStudies = async (formData) => {
    try {
        const response = await Axios.post(`/v1/core/estudios/`, formData)
        console.log(response);
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
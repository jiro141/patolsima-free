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
        console.log(response);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
//adjunto
export const postMuestraAdjunto = async (estudioIds,formData) => {   
    try {
        const response = await Axios.post(`/v1/core/estudios/${estudioIds}/adjuntos/`, formData, {
          headers: {
            "content-type": "application/pdf",
          },
        });
        console.log(response);
    
        return response.data;
      } catch (error) {
        throw new Error("Error uploading file");
      }


   
}

export const studiesDetail = async (id) => {
    try {
        const response = await Axios.get(`/v1/core/estudios/${id}`)
         console.log(response.data);
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
//search params
export const getStudiesListSearch = async ({ searchMuestra }) => {
    try {
        console.log('endpoint-->>>');
        const response = await Axios.get(`/v1/core/estudios/?search=${searchMuestra}`)
        console.log(response.data.results);
        return response.data.results
    } catch (error) {
        console.log(error);
    }
}

export const getStudiesListPriorityALTA = async () => {
    try {
        const response = await Axios.get(`/v1/core/estudios/?archived=false&prioridad=ALTA&informe_existe=false&informe_aprobado=false&informe_completado=false`)
        // console.log(response.data.results);
        return response.data.results
    } catch (error) {
        console.log(error.message);
    }
}
export const getStudiesListPriorityMEDIA= async () => {
    try {
        const response = await Axios.get(`/v1/core/estudios/?prioridad=MEDIA&informe_existe=true&informe_existe=false&informe_aprobado=false&informe_completado=false`)
        // console.log(response.data.results);
        return response.data.results
    } catch (error) {
        console.log(error);
    }
}
export const getStudiesListPriorityBAJA= async () => {
    try {
        const response = await Axios.get(`/v1/core/estudios/?prioridad=BAJA&confirmado=true&informe_existe=false&informe_aprobado=false&informe_completado=false`)
        // console.log(response.data.results);
        return response.data.results
    } catch (error) {
        console.log(error);
    }
}
export const getStudiesDetail = async (id) => {
    console.log(id)
    try {
        const response = await Axios.get(`/v1/core/estudios/${id}/`)
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const putStudiesDetail = async (id,data) => {
    console.log(id, 'este es el id');
    console.log(data, 'esta es la data ');
    try {
        const response = await Axios.put(`/v1/core/estudios/${id}/`,data)
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
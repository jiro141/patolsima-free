import Axios from "api/authApi";
//post create informes 
export const postInforme= async (id) => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const response = await Axios.post(`/v1/core/informes/`,id)
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

//informe list 
export const getListInforme= async () => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
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
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    // console.log(formData);
    try {
        const response = await Axios.put(`/v1/core/informes/${id}/`,formData);
        
        console.log(response.data);
        // return response;
    } catch (error) {
        console.log(error);
    }
}
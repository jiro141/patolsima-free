import Axios from "api/authApi";
//post create informes 
<<<<<<< HEAD
export const postInforme= async (id) => {
=======
export const postInforme = async (id) => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
>>>>>>> 21ee66a46830f329f7cef63d216b28f7d804a4e5
    try {
        const response = await Axios.post(`/v1/core/informes/`, id)
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

//informe list 
<<<<<<< HEAD
export const getListInforme= async () => {
=======
export const getListInforme = async () => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
>>>>>>> 21ee66a46830f329f7cef63d216b28f7d804a4e5
    try {
        const response = await Axios.get(`/v1/core/informes/`)
        // console.log(response.data.results);
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
//informe update  
<<<<<<< HEAD
export const updateInforme= async (id,formData) => {

=======
export const updateInforme = async (id, formData) => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
>>>>>>> 21ee66a46830f329f7cef63d216b28f7d804a4e5
    // console.log(formData);
    try {
        const response = await Axios.put(`/v1/core/informes/${id}/`, formData);

        console.log(response.data);
        // return response;
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
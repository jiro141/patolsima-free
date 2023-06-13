import Axios from "api/authApi";

//guardar estudio metodo post
export const postStudies = async (formData) => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const response = await Axios.post(`/v1/core/estudios/`, formData)
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}
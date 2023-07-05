import Axios from "api/authApi";

export const usersList= async () => {
    const token = localStorage.getItem("access");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const response = await Axios.get(`/v1/users/groups/`)
        return response.data.groups
    } catch (error) {
        console.log(error);
    }
}
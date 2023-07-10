import Axios from "api/authApi";

export const usersList= async () => {
    try {
        const response = await Axios.get(`/v1/users/groups/`)
        return response.data.groups
    } catch (error) {
        console.log(error);
    }
}
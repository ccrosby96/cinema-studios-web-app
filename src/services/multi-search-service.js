import axios from "axios";
const Movies_URL = "http://localhost:4000/api/search"

const api = axios.create({
    withCredentials: false,
});
export const multiSearch = async (searchParams) => {
    try {
        // Make a POST request to your backend API
        const response = await api.post(`${Movies_URL}`, searchParams);
        const ret = response.data;
        console.log('MultiSearch ret ', ret)
        return ret
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const multiGetSearch = async (searchParams) => {
    try {
        // Make a POST request to your backend API
        const query = searchParams.searchText;
        const response = await api.get(`${Movies_URL}/multi/${query}`);
        const ret = response.data;
        console.log('MultiSearch ret ', ret)
        return ret
    } catch (error) {
        console.error(error);
        throw error;
    }
}

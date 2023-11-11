import axios from "axios";
const AI_URL = "http://localhost:4000/api/ai-search"


const api = axios.create({
    withCredentials: false,
});
export const aiSearchPostMessage = async (conversation) => {
    try {
        console.log('called aiSearchPostMessage with convo', conversation);
        // Make a POST request to your backend API
        const response = await api.post(`${AI_URL}/chat`, conversation);
        const ret = response.data;
        return ret
    } catch (error) {
        console.error(error);
        throw error;
    }
}


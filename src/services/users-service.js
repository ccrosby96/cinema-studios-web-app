import axios from "axios";
const API_BASE =  "http://localhost:4000/api";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`
const USER_API = `${API_BASE}/users`;


const api = axios.create({
    withCredentials: true,
});

export const addToUserWatchlist = async (movie) => {
    try {
        console.log('watchlist movie in addToUserWatchList', movie);
        const response = await api.post(`${USER_API}/add-to-watchlist`, movie);

        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with an error status code
            console.error('Request error:', error.response.data);
            throw new Error(error.response.data.error || 'Request error');
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('No response received:', error.request);
            throw new Error('No response received');
        } else {
            // Something else happened while setting up the request
            console.error('Request setup error:', error.message);
            throw new Error('Request setup error');
        }
    }
};

export const getUser = async (handle) => {
    const response = await api.get(`${USER_API}/${handle}`);
    return response.data;
}

export const getAllUsers = async () => {
    const response = await api.get(USER_API + "/all");
    return response.data;
}


export const updateUser = async (user) => {
    const response = await api.put(`${USER_API}/${user._id}`, user);
    return user;
}

export const createUser = async (user) => {
    console.log("called create user with user: ", user);
    console.log("in services, USER_API = ", USERS_URL);
    const response = await api.post(`${USERS_URL}/register`, user);
    console.log(response);
    return response.data;
}

export const deleteUser = async (user) => {
    const response = await api.delete(`${USER_API}/${user}`);
    return user;
}

export const login = async ({ username, password }) => {

    const response = await api.post(`${USERS_URL}/login`, {
        username,
        password,
    });
    const user = response.data;
    return user;
};


export const logout = async () => {
    const response = await api.post(`${USER_API}/logout`);
    return response.data;
}

export const profile = async () => {
    const response = await api.post(`${USER_API}/profile`);
    return response.data;
}




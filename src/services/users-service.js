import axios from "axios";
const API_BASE =  "http://localhost:4000/api";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`
const USER_API = `${API_BASE}/users`;


const api = axios.create({
    withCredentials: true,
});
export const deleteFromUserWatchList = async (movieId) => {
    try {
        const response = await api.delete(`${USERS_URL}/watchlist/${movieId}`)
        return response.data
    } catch (error){
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
        }if (error.response) {
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
}

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
    const uid = user._id.toString()
    console.log('uid in user-service updateUser is', uid);
    console.log('data in user-service updateUser is', user);
    try {
        console.log("called update user with data", user);
        const response = await axios.put(`${USER_API}/${uid}`, user);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Failed to update user: Status ${response.status}`);
        }
    } catch (error) {
        console.error("Error updating user:", error);
        throw error; // Re-throw the error so it can be handled further up the call stack.
    }
};


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




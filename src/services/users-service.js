import axios from "axios";
const API_BASE =  "http://localhost:4000/api";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`
const USER_API = `${API_BASE}/users`;


const api = axios.create({
    withCredentials: true,
});


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




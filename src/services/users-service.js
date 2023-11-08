import axios from "axios";
const API_BASE =  "http://localhost:4000/api";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`
const USER_API = `${API_BASE}/users`;


const api = axios.create({
    withCredentials: true,
});
export const deleteFromUserWatchList = async (movieId) => {
    console.log('called deleteFromUserWatchList with movieId', movieId);
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
export const addToUserFavorites = async (movie) => {
    try {
        console.log('movie in addToUserFavorites', movie);
        const response = await api.post(`${USER_API}/add-to-favorites`, movie);
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
}
export const deleteFromUserFavorites = async (movieId) => {
    try {
        const response = await api.delete(`${USERS_URL}/favorites/${movieId}`)
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

export const getUser = async (handle) => {
    const response = await api.get(`${USER_API}/${handle}`);
    return response.data;
}
export const getBaseProfileByUsername = async (username) => {
    try {
        const response = await api.get(`${USER_API}/${username}/base-profile`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error fetching base profile by username:', error);
        // throw error
        throw new Error('Failed to fetch base profile');
    }
};
export const getWatchlistByUsername = async (username) => {
    try {
        const response = await api.get(`${USER_API}/${username}/watchlist`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error fetching watchlist by username:', error);
        // throw error
        throw new Error('Failed to fetch user watchlist');
    }
}
export const getFavoritesByUsername = async (username) => {
    try {
        console.log('calling getFavoritesByUsername with username', username);
        const response = await api.get(`${USER_API}/${username}/favorites`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error fetching favorites by username:', error);
        // throw error
        throw new Error('Failed to fetch user favorites');
    }
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
export const getFollowersList = async (userId) => {
    try {
        const response = await api.get(`${USER_API}/${userId}/followers`);
        return response.data;
    } catch (error) {
        console.error("Error fetching followers list:", error);
        throw error;
    }
};
export const getFollowersPageByUsername = async (username, pageNumber) => {
    try {
        const response = await api.get(`${USER_API}/${username}/followers/${pageNumber}`);
        return response.data;
    }catch (error) {
        console.error("Error fetching follower list of username")
        throw error;
    }
}
export const getFollowsPageByUsername = async (username, pageNumber) => {
    console.log('calling getFollowsPageByUsername', username, pageNumber);
    try {
        const response = await api.get(`${USER_API}/${username}/following/${pageNumber}`);
        return response.data;
    }catch (error) {
        console.error("Error fetching follows list of username")
        throw error;
    }
}
export const getUserFollowingList = async (userId) => {
    try {
        const response = await api.get(`${USER_API}/${userId}/following`);
        return response.data;
    } catch (error) {
        console.error("Error fetching followers list:", error);
        throw error;
    }
};
export const checkForFollowRelationship = async (userId, targetUserId) => {
    console.log('called checkForFollowRelationship with uid and tid', userId, targetUserId);
    try {
        const response = await api.get(`${USER_API}/${userId}/follows/${targetUserId}`)
        return response.data;
    }catch (error) {
        console.error("Error checking for follow relationship", error);
        throw error;
    }
}
export const followUser = async (follow) => {
    console.log('called followUser with relationship', follow)
    try {
        const response = await api.post(`${USER_API}/follow`, follow)
        return response.data;
    }catch (error){
        console.error("error following user", error)
        throw error
    }
}
export const unfollowUser = async (userId, targetUserId) => {
    try {
        const response = await api.delete(`${USER_API}/${userId}/unfollow/${targetUserId}`)
        return response.data
    }catch (error){
        console.error('error unfollowing user', error)
    }
}





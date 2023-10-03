import axios from "axios";
const Movies_URL = "http://localhost:4000/api/movie"

const api = axios.create({
    withCredentials: false,
});

export const fetchPopularMovies = async () => {
    try {
        const response = await api.get(`${Movies_URL}/popular`);
        const movies = response.data;
        return movies;
    } catch (error) {
        // Handle errors here
        console.error('Error fetching popular movies:', error.message);
        throw error; // Re-throw the error to be handled by the calling code
    }
};

export const fetchMovieVideosById = async (mid) => {
    console.log("movieId in fetchMovieVideosById", mid);
    const response  = await api.get(`${Movies_URL}/${mid}/videos`)
    const ret = response.data;
    return ret;
}
export const movieDiscoverSearch = async (searchParams) => {
    try {
        // Make a POST request to your backend API
        const response = await api.post(`${Movies_URL}/discover`, searchParams);
        const ret = response.data;
        console.log('movieDiscoverSearch ret ', ret)
        return ret
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const movieDiscoverSearchNextPage = async (searchParams) => {
    try {
        // Make a POST request to your backend API
        const response = await api.post(`${Movies_URL}/discover/next_page`, searchParams);
        const ret = response.data;
        console.log('movieDiscoverSearch ret ', ret)
        return ret
    } catch (error) {
        console.error(error);
        throw error;
    }

}
export const movieDiscoverSearchByPage = async (searchParams) => {
    try {
        // Make a POST request to your backend API
        const response = await api.post(`${Movies_URL}/discover/page`, searchParams);
        const ret = response.data;
        console.log('movieDiscoverSearchByPage ret ', ret)
        return ret
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export const findMovieDetailsById = async (mid) => {
    const response  = await api.get(`${Movies_URL}/details/${mid}`)
    console.log("are we getting here? line 12 findmoviedetails service function")
    const ret = response.data
    console.log("findmoviebyId ret val", ret)
    return ret
}

export const findMovieCastById = async (mid) => {
    const response = await api.get(`${Movies_URL}/cast/${mid}`)
    const ret = response.data
    return ret
}
export const findMovieProvidersById = async (mid) => {
    const response = await api.get(`${Movies_URL}/providers/${mid}`)
    const ret = response.data
    return ret
}
export const findMovieRecommendationsById = async (mid) => {
    const response = await api.get(`${Movies_URL}/recommendations/${mid}`)
    const ret = response.data
    return ret
}
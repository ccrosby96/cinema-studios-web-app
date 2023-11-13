import axios from "axios";
const Movies_URL = "http://localhost:4000/api/movie"
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;

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
export const fetchUpcomingMovies = async () => {
    try {
        const response = await api.get(`${SERVER_API_URL}/movie/upcoming`);
        return response.data;
    }catch (error) {
        console.error('Error fetching upcoming movies', error.message);
        throw error;
    }
}

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
    const ret = response.data
    console.log("findmoviebyId ret val", ret)
    return ret
}
export const findMovieDetailsByTitle = async (title) => {
    try {
        const response = await api.get(`${Movies_URL}/details/title/${title}`)
        return response.data
    }catch (error) {
        console.error(error);
        throw error;
    }
}
export const fetchMovieDetailsFromSuggestions = async (suggestions) => {
    console.log('called fetchMovieDetailsFromSuggestions', suggestions, `${Movies_URL}/details/suggestions`);
    try {
        const response = await api.post(`${Movies_URL}/details/suggestions`, suggestions)
        return response.data
    }catch (error) {
        console.error(error)
        throw error;
    }
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
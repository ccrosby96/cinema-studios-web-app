import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const REVIEWS_URL = `${SERVER_API_URL}/reviews/movies`

const api = axios.create({
    withCredentials: true,
});
export const getReviewsByMovieId = async (movieId) => {
    const response = await api.get(`${REVIEWS_URL}/${movieId}`)
    return response.data;
}

export const createMovieReview = async (review) => {
    const response = await api.post(`${REVIEWS_URL}`, review)
    return response.data;
}

export const getReviewsByUserId = async (userId) => {
    const response = await api.get(`${REVIEWS_URL}/user/${userId}`)
    return response.data;
}
export const updateMovieReview = async (post) => {
    const response = await api.put(`${REVIEWS_URL}`, post);
    return response.data;
}
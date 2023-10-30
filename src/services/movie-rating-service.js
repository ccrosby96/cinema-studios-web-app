import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const RATINGS_URL = `${SERVER_API_URL}/ratings/movies`

const api = axios.create({
    withCredentials: true,
});

export const getUserMovieRating = async (userId, movieId) => {
    try {
        const response = await api.get(`${RATINGS_URL}/${movieId}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user movie rating:', error);
        // Return a custom error message or object
        return 'Failed to fetch user movie rating. Please try again later.';
    }
};
export const postUserMovieRating = async (ratingObject) => {
    try {
        console.log("called postUserMovieRating with ratingObject", ratingObject);
        const response = await api.post(`${RATINGS_URL}`, ratingObject);
        return response;
    }catch (error) {
        console.error("Error posting movie rating", error);
        return "Failed to post user movie rating. Please try again later."
    }
}

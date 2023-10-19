import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const REVIEWS_URL = `${SERVER_API_URL}/reviews/movies`

const api = axios.create({
    withCredentials: true,
});
export const getReviewsByMovieId = async (movieId) => {
    const response = await api.get(`${REVIEWS_URL}/movie/${movieId}`)
    return response.data;
}

export const createMovieReview = async (review) => {
    console.log("in createMovieReview, review is", review)
    console.log('REVIEWS_URL',REVIEWS_URL)
    const response = await api.post(`${REVIEWS_URL}`, review)
    return response.data;
}

export const getReviewsByUserId = async (userId) => {
    const response = await api.get(`${REVIEWS_URL}/user/${userId}`)
    return response.data;
}
export const getReviewsByUserName = async (username) => {
    const response = await api.get(`${REVIEWS_URL}/user/username/${username}`)
    return response.data;
}
export const updateMovieReview = async (post) => {
    const response = await api.put(`${REVIEWS_URL}`, post);
    return response.data;
}
export const updateMovieReviewLikeDislike = async (update) => {
    console.log('vote update',update)
    console.log('calling server endpoint:', REVIEWS_URL + '/like-dislike')
    const response = await api.put(`${REVIEWS_URL}/like-dislike`, update)
    return response.data;
}
export const updateCommentLikeDislike = async (update) => {
    console.log('update in updateCommentLikeDislike', update)
    try {
        const response = await api.put(`${REVIEWS_URL}/like-dislike/comment`, update)
        return response.data;
    }catch (error) {
        console.error("server encountered an error updating likeDislikes for comment")
        throw error
    }
}
export const addReplyToReview = async (reviewId, reply) => {
    try {
        console.log("called addReplyToReview with reviewId,reply",reviewId,reply);
        const response = await api.put(`${REVIEWS_URL}/${reviewId}/add-comment`, reply);
        // Assuming the server responds with the updated review after adding the comment
        return response.data;
    } catch (error) {
        // Handle errors here
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server Error:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No Response from Server');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request Setup Error:', error.message);
        }
        // Throw the error to allow the calling code to handle it further if needed
        throw error;
    }
};
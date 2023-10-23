
import MovieReviewItem from "./movie-review";
import {useEffect, useState} from "react";
import {deleteMovieReview} from "../../services/movie-review-service";

function MovieReviewList ({reviews, movieId}) {
    const [movieReviews,setMovieReviews] = useState(reviews);

    useEffect(() => {

    }, [reviews, movieId]);

    if ( reviews === null || reviews.length === 0 ){
        return (<h5 className = "white-font"> No reviews yet for this movie</h5>)
    }

    const removeReview = async (reviewId) => {
        try {
            const updatedReviewList = movieReviews.filter((review) => review._id !== reviewId)
            console.log('updatedReviewList', updatedReviewList);
            const response = await deleteMovieReview(reviewId);
            setMovieReviews(updatedReviewList);
            console.log(response);
        }catch (error){
            console.error("Error deleting movie review", error.message);
            throw error
        }
    }

    return (
        <>
            <div className="container bg-dark nudge-up mt-0 rounded-3">

                <div className = "row">
                    <ul className = "list-group bg-dark no-bullets ms-1 mt-4">
                        {
                            movieReviews.map((review) => {
                                return (
                                    <MovieReviewItem review={review} movieId={movieId} onRemove = {removeReview}/>
                                )
                            })
                        }
                    </ul>
                </div>

            </div>
        </>
    )
}
export default MovieReviewList;
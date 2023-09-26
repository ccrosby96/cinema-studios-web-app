
import MovieReviewItem from "./movie-review";
import {useEffect} from "react";

function MovieReviewList ({reviews, movieId}) {

    useEffect(() => {

    }, [reviews, movieId]);

    if ( reviews === null || reviews.length === 0 ){
        return (<h5> No reviews yet for this movie</h5>)
    }
    console.log('movieReviewList reviews ',reviews)
    console.log('movieId in movieReviewList', movieId)


    return (
        <>
            <div className="container bg-dark nudge-up mt-0">

                <div className = "row">
                    <ul className = "list-group no-bullets ms-1">
                        {
                            reviews.map((review) => {

                                return (
                                    <MovieReviewItem review={review} movieId={movieId}/>
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
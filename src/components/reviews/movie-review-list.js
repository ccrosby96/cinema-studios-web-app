
import MovieReviewItem from "./movie-review";

function MovieReviewList ({reviews}) {

    if (reviews.length === 0 ){
        return (<h5> No reviews yet for this movie</h5>)
    }
    console.log(reviews)

    return (
        <>
            <div className="container bg-secondary nudge-up">

                <div className = "row">
                    <ul className = "list-group no-bullets ms-1">
                        {
                            reviews.map((review) => {

                                return (
                                    <MovieReviewItem review={review}/>
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
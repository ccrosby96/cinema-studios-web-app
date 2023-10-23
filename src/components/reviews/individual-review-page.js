import MovieReviewItem from "./movie-review";
import NavigationSidebar from "../navigation";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getReviewByReviewId} from "../../services/movie-review-service";
import LoadingScreen from "../profile/loading-profile";
function IndividualReviewPage ()  {
    const {rid} = useParams();
    console.log('reviewId in IndividualReviewPage', rid);
    const [review, setReview] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getReviewByReviewId(rid);
                setReview(response);
            }catch (error){
                console.error('Error getting review data in IndividualReviewPage')
            }
        }
        fetchData();
    }, [rid])

    if (review === null) {
        return (<LoadingScreen label={"Loading Review"}/>);
    }
    return (
        <div>
            <NavigationSidebar/>

            <div className = "container">

                <div className = "row mt-3">
                    <MovieReviewItem review={review} movieId={review.movieId}/>
                </div>
            </div>
        </div>
    )
}

export default IndividualReviewPage;

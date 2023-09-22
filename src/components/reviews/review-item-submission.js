import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {updateMovieReview} from "../../services/movie-review-service";
import {useState} from "react";
import {formatReviewDate} from "../../helper_functions/helper_functions";

function MovieReviewItemSubmission(
    review =
        {
            "_id": "650ca20c57f5765b5e5e310c",
            "author": {
                "_id": "6508a6f4b1c6568832cefe31",
                "username": "cal96",
                "profilePic": "https://i.pinimg.com/474x/84/4d/e9/844de9c373ad9fab296f13ca27ada9c6.jpg"
            },
            "rating": 9,
            "likes": 0,
            "movieId": 146233,
            "body": "this is a test review for Prisoners",
            "comments": [],
            "createdAt": "2023-09-21T20:05:32.028Z",
            "__v": 0
        },){
    const dispatch = useDispatch()

    const {currentUser} = useSelector( state => state.user)

    const [movieReview,setMovieReview] = useState(review.review)

    const handleUpvote = async () => {
        setMovieReview((prevReview) => ({
            ...movieReview,
            likes: prevReview.likes + 1,
        }));

        // Call a function to send the updated review data to your API
        // await updateMovieReview(movieReview);
    };

    const handleDownvote = async () => {
        // Create a copy of the review data and increment the likes count
        setMovieReview((prevReview) => ({
            ...movieReview,
            likes: prevReview.likes - 1,
        }));
        // Call a function to send the updated review data to your API
        // await updateMovieReview(movieReview);
    };

    return (
        <div className = "list-group-item-full-width mb-5 bg-secondary mb-0">
            <div className="row ">
                <div className="col-1">

                    <i className="fa-solid fa-chevron-up float-end fa-xl mt-2" onClick={handleUpvote}></i>
                    <br></br>
                    <p className="float-end m-0 p-0  a1-font-16px nudge-left" >{movieReview.likes}</p>
                    <br></br>
                    <i className="fa-solid fa-chevron-down fa-xl float-end mt-3" onClick={handleDownvote}></i>

                </div>

                <div className="col-11">

                    <img alt="" className="review-profile-pic float-start" src={currentUser.profilePic}/>
                    <p className="p-0 m-0 ps-5 ps-sm-4 ps-md-3 p fw-bold wd-font-family-arial text-dark text-wrap d-inline">

                    </p>

                    <h5 className = "p-0 m-0 ps-5 ps-sm-4 ps-md-3 p fw-bold wd-font-family-arial text-dark text-wrap d-inline">A review by {currentUser.username}</h5>
                    <p className="p-0 m-0 ps-1 wd-font-family-arial text-nowrap d-inline">
                        &#xb7; {formatReviewDate(movieReview.createdAt)}
                    </p>
                    <p className="p-0 m-0 ps-1 wd-font-family-arial text-nowrap d-inline">
                        &nbsp; {movieReview.rating} <i className="fa-solid fa-star color-yellow"></i>
                    </p>

                    <div className = "row">
                        <p className="ps-5 ps-sm-4 ps-md-3  mt-1 wd-font-family-arial text-dark">
                            {movieReview.body}
                        </p>
                        <i className="fa-regular fa-comment"></i>

                    </div>

                </div>

            </div>
        </div>
    );
}
export default MovieReviewItemSubmission;
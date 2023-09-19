import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {formatDate} from "../../helper_functions/helper_functions";
import {updateMovieReview} from "../../services/movie-review-service";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function MovieReviewItem(
    review =
        {
            "author": {
                "_id": "123abc",
                "username" : "cal96",
                "profilePic" : "url"
            },
            "comments": [],
            "likes": 0,
            "body": "String",
            "userProfilePic": "String",
            "createdAt": "2023-10-08",
            "title": "String",
            "authorUsername": "String",
            "_id": "642b3464feea95a346a7fd8e"
        }){
    const dispatch = useDispatch()

    const {currentUser} = useSelector( state => state.user)

    const [movieReview,setMovieReview] = useState(review.review)
    console.log(movieReview)

    const deletePostHandler = (id) => {
        return
    }
    const handleUpvote = async () => {
        // Create a copy of the review data and increment the likes count
        const updatedReview = {...movieReview, likes: review.likes + 1};
        // Update the state with the updated review data
        setMovieReview(updatedReview);
        // Call a function to send the updated review data to your API
        await updateMovieReview(updatedReview);
    };
    const handleDownvote = async () => {
        // Create a copy of the review data and increment the likes count
        const updatedReview = {...movieReview, likes: review.likes - 1};
        // Update the state with the updated review data
        setMovieReview(updatedReview);
        // Call a function to send the updated review data to your API
        await updateMovieReview(updatedReview);
    };
    console.log(movieReview.author.profilePic)

    return (
        <>
            <div className="row ">
                <div className="col-1">
                    <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
                    <i className="fa-solid fa-chevron-up float-end fa-xl mt-2"></i>
                    <br></br>
                    <i className="fa-solid fa-chevron-down fa-xl float-end mt-3"></i>

                </div>

                <div className="col-8">

                    <img alt="" className="review-profile-pic float-start" src={movieReview.author.profilePic}/>
                    <p className="p-0 m-0 ps-5 ps-sm-4 ps-md-3 p fw-bold wd-font-family-arial text-dark text-wrap d-inline">

                    </p>

                    <h5 className = "p-0 m-0 ps-5 ps-sm-4 ps-md-3 p fw-bold wd-font-family-arial text-dark text-wrap d-inline">A review by {movieReview.author.username}</h5>
                    <p className="p-0 m-0 ps-1 wd-font-family-arial text-secondary text-nowrap d-inline">
                          &#xb7; {movieReview.createdAt}
                    </p>
                    <p className="p-0 m-0 ps-1 wd-font-family-arial text-nowrap d-inline">
                         &nbsp; {movieReview.rating} <i className="fa-solid fa-star"></i>
                    </p>

                    <div className = "row">
                        <p className="ps-5 ps-sm-4 ps-md-3  mt-1 wd-font-family-arial text-dark">
                            {movieReview.body}
                        </p>

                    </div>

                </div>

                <div className="col-3">
                    <i className="fa fa-ellipsis-h float-end wd-margin-right-16px text-secondary"
                       ></i>
                </div>
            </div>
        </>
    );
}

export default MovieReviewItem;
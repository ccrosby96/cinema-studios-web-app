import {useSelector} from "react-redux";
import {updateMovieReview} from "../../services/movie-review-service";
import {useEffect, useState} from "react";
import {formatReviewDate} from "../../helper_functions/helper_functions";
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'



function MovieReviewItem({review,movieId}){
    TimeAgo.addDefaultLocale(en)
    const {currentUser} = useSelector( state => state.user)
    const [movieReview,setMovieReview] = useState(review)
    const timeAgo = new TimeAgo('en-US')


    useEffect(() => {
        setMovieReview(review)

    }, [review, movieId]);

    const deletePostHandler = (id) => {
        return
    }
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

    if (review === null) {
        return (<></>)
    }

    return (
        <div className = "list-group-item-full-width mb-5 bg-dark ">
            <div className="row ">
                <div className="col-1">

                    <i className="fa-solid fa-chevron-up float-end fa-xl mt-2" style = {{color: "white"}} onClick={handleUpvote}></i>
                    <br></br>
                    <p className="float-end m-0 p-0  a1-font-16px nudge-left white-font" >{movieReview.likes}</p>
                    <br></br>
                    <i className="fa-solid fa-chevron-down fa-xl float-end mt-3"  style = {{color: "white"}} onClick={handleDownvote}></i>

                </div>

                <div className="col-11">

                    <img alt="" className="review-profile-pic float-start" src={movieReview.author.profilePic}/>
                    <p className="p-0 m-0 ps-5 ps-sm-4 ps-md-3 p fw-bold wd-font-family-arial text-wrap d-inline white-font">

                    </p>

                    <h5 className = "p-0 m-0 ps-5 ps-sm-4 ps-md-3 p fw-bold wd-font-family-arial text-wrap d-inline white-font">A review by {movieReview.author.username}</h5>
                    <p className="p-0 m-0 ps-1 wd-font-family-arial text-nowrap d-inline white-font">
                          &#xb7; {timeAgo.format(new Date(movieReview.createdAt))}
                    </p>
                    <p className="p-0 m-0 ps-1 wd-font-family-arial text-nowrap d-inline white-font">
                         &nbsp; {movieReview.rating} <i className="fa-solid fa-star color-yellow"></i>
                    </p>

                    <div className = "row">
                        <p className="ps-5 ps-sm-4 ps-md-3  mt-1 wd-font-family-arial white-font">
                            {movieReview.body}
                        </p>
                        <i className="fa-regular fa-comment"></i>

                    </div>

                </div>

            </div>
        </div>
    );
}
export default MovieReviewItem;
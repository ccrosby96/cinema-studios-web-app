import {useSelector} from "react-redux";
import {updateMovieReview} from "../../services/movie-review-service";
import {useEffect, useState} from "react";
import {formatReviewDate} from "../../helper_functions/helper_functions";
import style from "../../styles/review-style.css"
import {updateMovieReviewLikeDislike} from "../../services/movie-review-service";
import ReplyForm from "./comment-reply-form";
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'
import ReviewCommentSection from "./review-comment-section";

function MovieReviewItem({review,movieId}){
    TimeAgo.addDefaultLocale(en)
    const {currentUser} = useSelector( state => state.user)
    const [movieReview,setMovieReview] = useState(review)
    const timeAgo = new TimeAgo('en-US')
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const[reply,setReply] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    useEffect(() => {
        setMovieReview(review)

    }, [review, movieId]);
    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const handleVote = async (likeDislike) => {
        if (!currentUser){
            alert("You need to be logged in to vote on reviews")
            return
        }
        const updateObject =
            {
                "reviewId": review._id,  // Replace with the actual review ID
                "userId": currentUser._id,    // Replace with the actual user ID
                "isLike": likeDislike,
            }
        let update = await updateMovieReviewLikeDislike(updateObject);
        console.log('update in handleVote', update);
    }

    const handleReplySubmit = (data) => {
        // Handle the reply submission, e.g., send data to the server
        console.log('Submitting reply:', data);

    };
    function toggleReplyForm (){
        if (!currentUser){
            alert("You need to login to reply to reviews!");
            return;
        }
        // display reply form
        setReply(!reply);
    }
    const handleUpvote = async () => {
        if (!currentUser){
            alert("You need to be logged in to vote on reviews")
            return
        }
        if (!isUpvoted) {
            if (isDownvoted){
                setMovieReview((prevReview) => ({
                    ...movieReview,
                    likes: prevReview.likes + 2,
                }));
                setIsUpvoted(true);
                setIsDownvoted(false);
            }
            else {
                setMovieReview((prevReview) => ({
                    ...movieReview,
                    likes: prevReview.likes + 1,
                }));
                setIsUpvoted(true);
            }
        }
        else {
            setMovieReview((prevReview) => ({
                ...movieReview,
                likes: prevReview.likes - 1,
            }));
            setIsUpvoted(false);
        }

        // Call a function to send the updated review data to your API
        // await updateMovieReview(movieReview);
        await handleVote(true);
    };


    const handleDownvote = async () => {
        if (!currentUser){
            alert("You need to be logged in to vote on reviews")
            return
        }
        if (!isDownvoted) {
            if (isUpvoted) {
                setMovieReview((prevReview) => ({
                    ...movieReview,
                    likes: prevReview.likes - 2,
                }));
                setIsDownvoted(true);
                setIsUpvoted(false);
            }
            else {
                setMovieReview((prevReview) => ({
                    ...movieReview,
                    likes: prevReview.likes - 1,
                }));
                setIsDownvoted(true);
            }
        }
        else {
            setMovieReview((prevReview) => ({
                ...movieReview,
                likes: prevReview.likes + 1,
            }));
            setIsDownvoted(false);
        }
        await handleVote(false);
    };

    if (review === null) {
        return (<></>)
    }

    return (
        <div className = "list-group-item-full-width mb-3 rounded-3 p-1 ">
            <div className="row ">
                <div className="col-12">

                    <img alt="" className="review-profile-pic float-start" src={movieReview.author.profilePic}/>
                    <p className="p-0 m-0 ps-5 ps-sm-4 ps-md-3 p fw-bold wd-font-family-arial text-wrap d-inline white-font">

                    </p>

                    <h5 className = "p-0 m-0 ps-0 ps-sm-0 ps-md-0 fw-bold wd-font-family-arial text-wrap d-inline white-font">@{movieReview.author.username}</h5>
                    <p className="p-0 m-0 ps-1 wd-font-family-arial text-nowrap d-inline time-ago-font">
                           {timeAgo.format(new Date(movieReview.createdAt))}
                    </p>
                    <p className="p-0 m-0 ps-1 wd-font-family-arial text-nowrap d-inline white-font">
                         &nbsp; {movieReview.rating} <i className="fa-solid fa-star color-yellow"></i>
                    </p>

                    <div className="row">
                        <p className = "white-font">{movieReview.body}</p>
                        <span className="white-font me-2">
                            <i
                                className={`${isUpvoted ? "upvoted fa-solid" : "fa-regular"} fa-thumbs-up me-2`}
                                style={{ color: "white" }}
                                onClick={handleUpvote}
                            ></i>
                              {movieReview.likes}
                              <i
                                  className={`${isDownvoted ? "upvoted fa-solid" : "fa-regular"} fa-thumbs-down ms-2`}
                                  style={{ color: "white" }}
                                  onClick={handleDownvote}
                              ></i>
                            <button className="m-0 ms-4 white-font btn btn-dark p-0 reply-btn"
                                    style={{ color: "white" }}
                                    onClick = {toggleReplyForm}
                            >
                              reply
                            </button>
                        </span>
                        {reply &&
                            <ReplyForm reviewId = {review._id} parentCommentId= {null} replyTo={null} onSubmit={handleReplySubmit} user = {currentUser}/>
                        }
                        <span className = "blue-font">

                            {review.comments.length > 0 && (<button
                                className="m-0 blue-font rounded-3 bg-dark  p-2 float-start"
                                onClick={toggleReplies}
                                >
                                <i className="fa-solid fa-sort-down fa-lg float-start me-2 mt-1 p-1"></i>
                                {review.comments.length} replies
                            </button>)}
                        </span>
                        {showReplies && (
                            <ReviewCommentSection
                                replies={review.comments}
                                parentCommentId={null}
                                reviewId={review._id}
                            />
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
export default MovieReviewItem;
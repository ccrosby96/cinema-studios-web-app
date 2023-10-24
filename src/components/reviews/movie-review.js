import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {updateMovieReview, deleteMovieReview} from "../../services/movie-review-service";
import {useEffect, useState} from "react";
import {updateMovieReviewLikeDislike} from "../../services/movie-review-service";
import ReplyForm from "./comment-reply-form";
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'
import ReviewCommentSection from "./review-comment-section";
import {generateReviewShareLink} from "../../helper_functions/helper_functions";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
TimeAgo.addDefaultLocale(en)


function MovieReviewItem({review,movieId,onRemove}){
    const {currentUser} = useSelector( state => state.user)
    const [movieReview,setMovieReview] = useState(review)
    const timeAgo = new TimeAgo('en-US')
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const[reply,setReply] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [spoilers, setSpoilers] = useState(false);
    const [spoilersVisible, setSpoilersVisible] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const shareReview = () => {
        const url = generateReviewShareLink(review);
        navigator.clipboard.writeText(url)
            .then(() => {
                console.log('Text copied to clipboard: ' + url);
                toast.success('Copied Link To Clipboard!', {
                    position: 'top-right',
                    autoClose: 3000, // Notification will close after 3 seconds
                    hideProgressBar: false, // Show a progress bar
                    closeOnClick: true, // Close the notification when clicked
                    pauseOnHover: true, // Pause the timer on hover
                    draggable: true, // Allow dragging the notification
                    style: {
                        background: 'rgba(52, 58, 64, 1)',
                        color: "white",
                    },
                });
            })
            .catch((error) => {
                console.error('Copy to clipboard failed: ', error);
                console.log(error)
            });
    }
    const handleRemove = () => {
        console.log('calling handleRemove with reviewId', review._id)
        try {
            onRemove(review._id)
            toast.success('Review Successfully Deleted', {
                position: 'top-right',
                autoClose: 3000, // Notification will close after 3 seconds
                hideProgressBar: false, // Show a progress bar
                closeOnClick: true, // Close the notification when clicked
                pauseOnHover: true, // Pause the timer on hover
                draggable: true, // Allow dragging the notification
                style: {
                    background: 'rgba(52, 58, 64, 1)',
                    color: "white",
                },
            });
        }catch (error) {
            console.error("issue removing review")
        }


    }
    const handleReport = () => {
        toast.success('Review Reported To Popcorn. Thank You!', {
            position: 'top-right',
            autoClose: 3000, // Notification will close after 3 seconds
            hideProgressBar: false, // Show a progress bar
            closeOnClick: true, // Close the notification when clicked
            pauseOnHover: true, // Pause the timer on hover
            draggable: true, // Allow dragging the notification
            style: {
                background: 'rgba(52, 58, 64, 1)',
                color: "white",
            },
        });
    }
    const handleDropdownClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    useEffect(() => {
        setMovieReview(review)
        if ("containsSpoilers" in review && review.containsSpoilers){
            console.log("review flagged for spoilers!");
            setSpoilers(true);
            setSpoilersVisible(false);
        }

    }, [review, movieId]);
    const handleSpoilersClick = () => {
        if (spoilers) {
            setSpoilersVisible(!spoilersVisible);
        }
    };
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
        <div className = "list-group-item-full-width mb-3 bg-dark rounded-3 p-1 ">
            <div className="row">
                <div className="col-10">
                    <Link className = "text-decoration-none p-0 m-0" to = {`/profile/${movieReview.author.username}`}>
                        <img alt="" className="review-profile-pic float-start" src={movieReview.author.profilePic}/>
                    </Link>


                    <p className="p-0 m-0 ps-5 ps-sm-4 ps-md-3 p fw-bold wd-font-family-arial text-wrap d-inline white-font">

                    </p>

                    <h5 className = "p-0 m-0 ps-0 ps-sm-0 ps-md-0 fw-bold wd-font-family-arial text-wrap d-inline white-font">@{movieReview.author.username}</h5>
                    <p className="p-0 m-0 ps-1 wd-font-family-arial text-nowrap d-inline time-ago-font">
                           {timeAgo.format(new Date(movieReview.createdAt))}
                    </p>
                    <p className="p-0 m-0 ps-1 wd-font-family-arial text-nowrap d-inline white-font">
                         &nbsp; {movieReview.rating} <i className="fa-solid fa-star color-yellow"></i>
                        {spoilers && <i className=" ms-3 fa-solid fa-circle-exclamation "></i>}
                    </p>

                    <div className="row">
                        <div className="review-body-container">
                            {!spoilers || spoilersVisible ? (
                                <p className="white-font review-body" onClick={handleSpoilersClick}>{movieReview.body}</p>
                            ) : (
                                <p className="white-font review-body spoilers-blur" onClick={handleSpoilersClick}>{movieReview.body}</p>
                            )}
                        </div>
                        <span className="white-font me-2 nudge-up">
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
                        <span className = "blue-font nudge-up">

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
                <div className="col-2">
                    <div className = "row">
                        <button className = "btn" onClick={handleDropdownClick}>
                            <i className="fa-solid fa-ellipsis-vertical color-grey me-3 mt-3"></i>
                        </button>
                    </div>
                    <div className="row">
                        {isDropdownVisible && (
                            <div className="list-group bg-secondary push-right">
                                <div className="list-group-item border-0 bg-secondary" onClick={shareReview}>
                                    <i className="fa-solid fa-share float-start color-white nudge-down"></i>
                                    <span className="white-font ms-3 ">Share</span>
                                </div>
                                {currentUser &&
                                    ((currentUser.role === "admin") || (currentUser.role !== "admin" && review.author.username === currentUser.username)) && (
                                        <div className="list-group-item border-0 bg-secondary" onClick={handleRemove}>
                                            <i className="fa-solid fa-trash float-start color-white nudge-down"></i>
                                            <span className="white-font ms-3">Delete</span>
                                        </div>
                                    )}

                                <div className="list-group-item border-0 bg-secondary" onClick = {handleReport}>
                                    <i className="fa-solid fa-flag float-start  nudge-down"></i>
                                    <span className="white-font ms-3 ">Report</span>
                                </div>
                            </div>

                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}
export default MovieReviewItem;
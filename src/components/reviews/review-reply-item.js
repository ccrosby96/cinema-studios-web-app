
import {useEffect, useState} from "react";
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'
import style from "../../styles/review-style.css"
import {updateMovieReviewLikeDislike} from "../../services/movie-review-service";
import {useSelector} from "react-redux";
import ReplyForm from "./comment-reply-form";


function ReviewReplyItem ({reply, parentCommentId,reviewId}) {
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')
    const [replyData, setReplyData] = useState(null);
    const {currentUser} = useSelector( state => state.user)
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [replyForm, setreplyForm]  = useState(false);
    const [parentUser, setParentUser] = useState("");


    useEffect( () => {
        setReplyData(reply)
        if (reply.replyTo) {
            setParentUser(reply.replyTo.username);
            console.log("this is a child comment, parent author is ", parentUser);
        }

    }, [reply]);
    console.log("ReviewReplyItem reply: ", reply)
    function toggleReplyForm (){
        if (!currentUser){
            alert("You need to login to reply to reviews!");
            return;
        }
        // display reply form
        setreplyForm(!replyForm);
    }

    const handleVote = async (likeDislike) => {
        if (!currentUser){
            alert("You need to be logged in to vote on reviews")
            return
        }
        const updateObject =
            {
                reviewId: parentCommentId,
                "commentId": reply._id,  // Replace with the actual review ID
                "userId": currentUser._id,    // Replace with the actual user ID
                "isLike": likeDislike,
            }
        //let update = await updateMovieReviewLikeDislike(updateObject);
       // console.log('update in handleVote', update);
    }

    const handleUpvote = async () => {
        if (!currentUser){
            alert("You need to be logged in to vote on reviews")
            return
        }
        if (!isUpvoted) {
            if (isDownvoted){
                setReplyData((prevReply) => ({
                    ...replyData,
                    likes: prevReply.likes + 2,
                }));
                setIsUpvoted(true);
                setIsDownvoted(false);
            }
            else {
                setReplyData((prevReview) => ({
                    ...replyData,
                    likes: prevReview.likes + 1,
                }));
                setIsUpvoted(true);
            }
        }
        else {
            setReplyData((prevReview) => ({
                ...replyData,
                likes: prevReview.likes - 1,
            }));
            setIsUpvoted(false);
        }

        // Call a function to send the updated review data to your API
        // await updateMovieReview(movieReview);
        //await handleVote(true);
    };
    const handleDownvote = async () => {
        if (!currentUser){
            alert("You need to be logged in to vote on reviews")
            return
        }
        if (!isDownvoted) {
            if (isUpvoted) {
                setReplyData((prevReply) => ({
                    ...replyData,
                    likes: prevReply.likes - 2,
                }));
                setIsDownvoted(true);
                setIsUpvoted(false);
            }
            else {
                setReplyData((prevReply) => ({
                    ...replyData,
                    likes: prevReply.likes - 1,
                }));
                setIsDownvoted(true);
            }
        }
        else {
            setReplyData((prevReply) => ({
                ...replyData,
                likes: prevReply.likes + 1,
            }));
            setIsDownvoted(false);
        }
       // await handleVote(false);
    };
    console.log(replyData);
    if (replyData === null) {
        return (<>loading</>)
    }

    return (
        <div className = "list-group-item-full-width mb-3 rounded-3 p-1 ">
            <div className="row ">
                <div className="col-12">

                    <img alt="" className="comment-profile-pic float-start" src={replyData.author.profilePic}/>
                    <p className="p-0 m-0 ps-5 ps-sm-4 ps-md-3 p fw-bold wd-font-family-arial text-wrap d-inline white-font">

                    </p>

                    <h5 className = "p-0 m-0 ps-0 ps-sm-0 ps-md-0 fw-bold wd-font-family-arial text-wrap d-inline white-font">@ {replyData.author.username}</h5>
                    <p className="p-0 m-0 ps-1 wd-font-family-arial text-nowrap d-inline time-ago-font">
                        {timeAgo.format(new Date(replyData.createdAt))}
                    </p>
                    <div className="row">
                        {parentUser !== "" && (
                            <p className="blue-font mb-0">@{parentUser}</p>
                        )}
                        <p className="white-font ">{replyData.body}</p>

                        <span className="white-font me-2">
                            <i
                                    className={`${isUpvoted ? "upvoted fa-solid" : "fa-regular"} fa-thumbs-up me-2`}
                                    style={{ color: "white" }}
                                    onClick={handleUpvote}
                            ></i>
                            {replyData.likes}
                            <i
                                className={`${isDownvoted ? "upvoted fa-solid" : "fa-regular"} fa-thumbs-down ms-2`}
                                style={{ color: "white" }}
                                onClick={handleDownvote}
                            ></i>
                                <button className="m-0 ms-4 white-font btn btn-dark p-0 reply-btn"
                                        style={{ color: "white" }}
                                        onClick={toggleReplyForm}
                                >
                                  reply
                                </button>
                            </span>
                        {replyForm &&
                            <ReplyForm reviewId = {reviewId} parentCommentId= {reply._id} replyTo={reply.author._id} user = {currentUser}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReviewReplyItem

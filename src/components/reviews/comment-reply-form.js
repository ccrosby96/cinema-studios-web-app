import React, { useState } from 'react';
import {addReplyToReview} from "../../services/movie-review-service";

const ReplyForm = ({reviewId, parentCommentId,replyTo, onSubmit, user }) => {
    const [replyContent, setReplyContent] = useState('');
    const[submitted,setSubmitted] = useState(false);
    console.log("value of submitted bool in ReplyForm", submitted);
    const handleContentChange = (event) => {
        setReplyContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform any validation if needed
        console.log("replying to review with id", reviewId)
        const newComment = {
            parentComment: parentCommentId,
            replyTo: replyTo,
            author: user._id,
            body: replyContent,
            likes: 0
        }
        const response = await addReplyToReview(reviewId, newComment);
        console.log(response)
        // Call the onSubmit prop with the reply content
        //onSubmit({reviewId, replyContent});
        console.log('new comment created: ', newComment);
        await setSubmitted(true);
        // Clear the form after submission
    };


    return (
        <>
            {submitted ? (
                <p className = "white-font">{replyContent}</p>
                ):
                (<form onSubmit={handleSubmit}>
                    <input type="hidden" name="parentCommentId" value={parentCommentId} />

                    <label htmlFor="replyContent">Reply:</label>
                    <textarea
                        id="replyContent"
                        name="replyContent"
                        value={replyContent}
                        onChange={handleContentChange}
                        rows="4"
                        cols="50"
                        required
                        className = "white-font"
                    ></textarea>

                    <button type="submit" className = "btn btn-primary rounded-pill ms-2">Submit Reply</button>
                </form>)
            }
        </>
    );
};

export default ReplyForm;

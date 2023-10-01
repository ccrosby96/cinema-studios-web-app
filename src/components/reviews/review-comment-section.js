
import ReviewReplyItem from "./review-reply-item";
import {useEffect} from "react";

function ReviewCommentSection ({replies, parentCommentId,reviewId}) {

    useEffect(() => {

    }, [replies]);

    if ( replies === null || replies.length === 0 ){
        return (<></>)
    }
    console.log('Review comments ',replies)
    return (
        <>
            <div className="container bg-dark nudge-up mt-0 rounded-3">
                <div className = "row">
                    <ul className = "list-group bg-dark no-bullets ms-1 mt-4">
                        {
                            replies.map((comment) => {
                                return (
                                    <ReviewReplyItem reply={comment} parentCommentId = {parentCommentId} reviewId={reviewId}/>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
export default ReviewCommentSection;
import MovieListItem from "../search/movie-list-item";
import ProfileReviewItem from "./profile-review-item";
function ProfileReviewList ({reviews}) {
    console.log("reviews in profileReviewList", reviews);

    if (reviews === null || reviews.length === 0) {
        return (<p> go write some reviews!</p>)
    }
    // Sort reviews by createdAt in descending order
    const sortedReviews = [...reviews].sort((a, b) => {
        // Convert the createdAt strings to Date objects for comparison
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        // Compare the dates in descending order
        return dateB - dateA;
    });

    return (
        <>
            <ul className= "list-group no-bullets bg-dark">
                {
                    sortedReviews.map((review, i) => {

                        return (
                            <ProfileReviewItem review={review}/>
                        )
                    })
                }
            </ul>
        </>
    );
}
export default ProfileReviewList
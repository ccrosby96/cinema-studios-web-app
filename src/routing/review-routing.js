import {Route, Routes} from "react-router";
import IndividualReviewPage from "../components/reviews/individual-review-page";

function ReviewRouting(){
    return (
        <Routes>
            <Route path = {"/:rid"} element = {<IndividualReviewPage/>}/>
        </Routes>
    )
}
export default ReviewRouting;
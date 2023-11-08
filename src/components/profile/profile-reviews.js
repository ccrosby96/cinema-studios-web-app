import {useParams} from "react-router";
import ProfileReviewList from "./profile-review-list";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {profileThunk} from "../../thunks/users-thunks";
import {getReviewsByUserName} from "../../services/movie-review-service";
import {Link} from "react-router-dom";
import NavigationSidebar from "../navigation";
import LoadingScreen from "./loading-profile";
import ProfilePageBar from "./profile-page-bar";
function ProfileReviews () {
    const { currentUser } = useSelector((state) => state.user);
    const [data,setData] = useState(null);
    const { username } = useParams();
    const [profile,setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getReviewsByUserName(username);
                setData(response);
                console.log('data: ', data);
                setProfile(currentUser)

            } catch (error) {
                // Handle errors here (e.g., display an error message)
                console.error("Error fetching profile:", error);
            }
        };
        fetchData();
    }, []);

    if (data === null){
        return (<LoadingScreen label={"Reviews"} />)
    }
    else if (data.reviews.length === 0) {
        return (<h4 className = "white-font justify-content-center">{username} hasn't written any reviews yet</h4>)
    }
    console.log("current user in profileReviews",profile)
    return (
        <div className = "bg-landing-page m-0 p-0">
            <NavigationSidebar/>
        <div className = "container bg-dark mt-3 ">
            <ProfilePageBar username={username} profilePic={data.profilePic} section={"reviews"}/>
            <div className = "container mt-3">
                <h5 className = "white-font">Reviews by {data.username}</h5>
                <ProfileReviewList reviews={data.reviews}/>
            </div>

        </div>
        </div>
    )
}
export default ProfileReviews
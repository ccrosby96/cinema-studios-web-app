import {useParams} from "react-router";
import ProfileReviewList from "./profile-review-list";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {profileThunk} from "../../thunks/users-thunks";
import {getReviewsByUserName} from "../../services/movie-review-service";
import {Link, useLocation} from "react-router-dom";
import NavigationSidebar from "../navigation";
import {getBaseProfileByUsername, getWatchlistByUsername} from "../../services/users-service";
import MovieWatchList from "./movie-watch-list";
import {useDispatch} from "react-redux";
import LoadingScreen from "./loading-profile";
import ProfilePageBar from "./profile-page-bar";
function ProfileWatchlist () {
    const { currentUser } = useSelector((state) => state.user);
    const [data,setData] = useState(null);
    const { username } = useParams();
    const [profile,setProfile] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getWatchlistByUsername(username);
                setData(response)
                const userProfile = await getBaseProfileByUsername(username)
                setProfile(userProfile);
                setLoggedInUser(currentUser)
                console.log('data: ', data);
            } catch (error) {
                // Handle errors here (e.g., display an error message)
                console.error("Error fetching profile:", error);
            }
        };
        fetchData();
    }, []);

    if (data === null){
        return (<LoadingScreen label={"Watchlist"} />)
    }
    else if (data.watchlist.length === 0) {
        return (<h4 className = "white-font justify-content-center">{username} has no movies in watchlist, how sad</h4>)
    }
    console.log("current user in profileReviews",profile)
    return (
        <div className = "bg-landing-page m-0 p-0">
            <NavigationSidebar/>
            <div className = "container bg-dark mt-3 ">
                <ProfilePageBar username={username} profilePic={data.profilePic} section={"watchlist"}/>
                <div className = "container mt-3">
                    <h5 className = "white-font">{data.username}'s Watchlist</h5>
                    <MovieWatchList movies={data.watchlist} profile={profile} username = {username} loggedInUser = {loggedInUser}/>
                </div>

            </div>
        </div>
    )
}
export default ProfileWatchlist;
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
function ProfileWatchlist () {
    const { currentUser } = useSelector((state) => state.user);
    const [data,setData] = useState(null);
    const { username } = useParams();
    const [profile,setProfile] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const location = useLocation();

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
        return (<h4 className = 'white-font justify-content-center'> Loading Watchlist</h4>)
    }
    else if (data.watchlist.length === 0) {
        return (<h4 className = "white-font justify-content-center">{username} has no movies in watchlist, how sad</h4>)
    }
    console.log("current user in profileReviews",profile)
    return (
        <div className = "bg-landing-page m-0 p-0">
            <NavigationSidebar/>
            <div className = "container bg-dark mt-3 ">
                <div className = "row">

                    <ul className="nav nav-highlight justify-content-center border-secondary border-top-2 border-bottom-2 border-1 m-0 p-0">
                        <li clasName = "nav-item float-start m-0 p-0">

                            <img
                                className="img-fluid p-3"
                                src={data.profilePic}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover", // Maintain aspect ratio while filling the box
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                }}
                                alt="Profile Avatar"
                            />



                        </li>

                        <li  className={`nav-item mt-4 pt-2 ${location.pathname === `/profile/${username}` ? 'active' : ''}`}>
                            <Link className = "text-decoration-none" to={`/profile/${username}`}>
                                <a className="grey-no-underline ms-3 me-3">
                                    Profile
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item mt-4 pt-2">
                            <Link className = "text-decoration-none" to={`/profile/${username}/reviews`}>
                                <a className="grey-no-underline ms-3 me-3">
                                    Reviews
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item mt-4 pt-2 active">
                            <a className="grey-underline ms-3 me-3 " href="">
                                Watchlist
                            </a>
                        </li>
                        <li className="nav-item mt-4 pt-2">
                            <Link className = "text-decoration-none" to={`/profile/${username}/favorites`}>
                                <a className="grey-no-underline ms-3 me-3">
                                    Favorites
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item mt-4 pt-2">
                            <a className="grey-no-underline ms-3 me-3" href="#">
                                Followers
                            </a>
                        </li>
                        <li className="nav-item mt-4 pt-2">
                            <a className="grey-no-underline ms-3 me-3" href="#">
                                Following
                            </a>
                        </li>
                    </ul>

                </div>
                <div className = "container mt-3">
                    <h5 className = "white-font">{data.username}'s Watchlist</h5>
                    <MovieWatchList movies={data.watchlist} profile={profile} username = {username} loggedInUser = {loggedInUser}/>
                </div>

            </div>
        </div>
    )
}
export default ProfileWatchlist;
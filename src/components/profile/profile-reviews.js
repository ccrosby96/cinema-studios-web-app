import {useParams} from "react-router";
import ProfileReviewList from "./profile-review-list";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {profileThunk} from "../../thunks/users-thunks";
import {getReviewsByUserName} from "../../services/movie-review-service";
import {Link} from "react-router-dom";
import NavigationSidebar from "../navigation";
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
        return (<h4 className = 'white-font justify-content-center'> Loading Reviews</h4>)
    }
    else if (data.reviews.length === 0) {
        return (<h4 className = "white-font justify-content-center">{username} hasn't written any reviews yet</h4>)
    }
    console.log("current user in profileReviews",profile)
    return (
        <div className = "bg-landing-page m-0 p-0">
            <NavigationSidebar/>
        <div className = "container bg-dark mt-3 ">
            <div className = "row">

                <ul className="nav nav-highlight justify-content-center border-secondary border-top-2 border-bottom-2 border-1 m-0 p-0">
                    <li clasName = "nav-item float-start m-0 p-0">

                        <img className="img-fluid avatar-top-bar p-3" src={data.profilePic} style = {{width: "100px",height: "100px"}}/>

                    </li>

                    <li className="nav-item mt-4 pt-2">
                        <Link className = "text-decoration-none" to={`/profile/${username}`}>
                            <a className="grey-no-underline ms-3 me-3">
                                Profile
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item mt-4 pt-2">
                        <Link className = "text-decoration-none" to={`/profile/${username}/reviews`}>
                            <a className="grey-underline ms-3 me-3">
                                Reviews
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item mt-4 pt-2">
                        <Link className = "text-decoration-none" to={`/profile/${username}/watchlist`}>
                            <a className="grey-no-underline ms-3 me-3">
                                Watchlist
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item mt-4 pt-2">
                        <a className="grey-no-underline ms-3 me-3" href="#">
                            Favorites
                        </a>
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
                <h5 className = "white-font">Reviews by {data.username}</h5>
                <ProfileReviewList reviews={data.reviews}/>
            </div>

        </div>
        </div>
    )
}
export default ProfileReviews
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/profile.css"
import {useNavigate, useParams} from "react-router";
import { profileThunk, updateUserThunk }
    from "../../thunks/users-thunks";
import NavigationSidebar from "../navigation";
import NoProfile from "./no-profile";
import FavoritesScrollBar from "../favorites";
import {getReviewsByUserId} from "../../services/movie-review-service";
import ProfileReviewList from "./profile-review-list";
import ProfileStatItem from "./profile-stat-item";
import {
    getBaseProfileByUsername,
    checkForFollowRelationship,
    followUser,
    unfollowUser,
    getFollowersList
} from "../../services/users-service";
import {Link} from "react-router-dom";
import FollowerGrid from "./follow-grid";
import FollowingGrid from "./follower-grid";
function ProfileScreen() {
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(null);
    const [reviews,setReviews] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(currentUser);
    const [followRelationship, setFollowRelationship] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {username} = useParams()
    console.log('username in ProfileScreen', username);
    console.log('currentUser in profileScreen', currentUser);

    const handleEditProfileButtonClick = ()=> {
        navigate('/profile/settings')
    }
    const handleFollowButtonClick = async () => {
        // if no logged-in user stop
        if (currentUser === null) {
            setFollowRelationship(!followRelationship);
            return
        }
        // if they follow this user try to unfollow
        if (followRelationship) {
            try {
                const response = await unfollowUser(currentUser._id, profile._id)
                // update display
                setFollowRelationship(false);
                return
            }catch(error){
                console.error(error);
            }
        }
        else {
            // if they don't follow try and follow this user, create relationship
            const relationship = {
                    follower: currentUser._id,
                    following: profile._id
                }
                try {
                    const response = await followUser(relationship);
                    console.log('created follow relationship', response);
                    // update display
                    setFollowRelationship(true)

                } catch (error) {
                    console.error(error)
                }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {loggedUser} = await dispatch(profileThunk())
                setLoggedInUser(loggedUser)
                console.log('currentUser', loggedUser);
                const userProfile = await getBaseProfileByUsername(username)
                setProfile(userProfile);
                // a user is logged in now, check for a follow/followee relationship

                console.log("set profile in profile screen to ", profile);

                // get some user reviews too for profile
                console.log('uid of user in profile screen', userProfile._id);

                const userReviews = await getReviewsByUserId(userProfile._id);
                setReviews(userReviews);
                console.log('user reviews: ', userReviews);
                // check for a follow relationship between logged in user and this user
                if (currentUser !== null && userProfile !== null) {
                    console.log('now checking for a follow relationship', currentUser.username, userProfile.username);
                    const followRelationship = await checkForFollowRelationship(currentUser._id, userProfile._id)
                    console.log("outcome of follow relationship check", followRelationship);
                    // setting the follow relationship
                    setFollowRelationship((followRelationship.follows))
                }
                // get a list of people that this user follows


            } catch (error) {
                // Handle errors here (e.g., display an error message)
                console.error("Error fetching profile:", error);
            }
        };

        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [username]);  // Empty dependency array ensures it only runs once, similar to componentDidMount

    // if not loggged in don't try and load profile
    if (!profile){
        console.log("no user profile loaded")
        return (
                <NoProfile/>
            );
    }
    if (profile){
        console.log('followers of this user', profile.followers)
        console.log('people this user is following', profile.following);
    }

    console.log('user reviews', reviews)
     return (
         <div className = "bg-landing-page m-0 p-0">
             <NavigationSidebar/>

         <div class="container rounded mt-3 mb-5 bg-dark border-1 border-secondary">
             <div className = "row">
                 <div className = "col-2">
                     <img
                         className="img-fluid p-3"
                         src={profile.profilePic}
                         style={{
                             width: "140px",
                             height: "140px",
                             objectFit: "cover", // Maintain aspect ratio while filling the box
                             borderRadius: "50%",
                             overflow: "hidden",
                         }}
                         alt="Profile Avatar"
                     />
                 </div>
                 <div className = "col-4">
                     <div className = "float-start">
                         <h4 className = "white-font mt-5">{profile.username}  <span className="grey-text  ms-2 mt-5">{profile.role}</span></h4>
                         <i className="fa-solid fa-location-dot float-start me-2" style = {{color:"grey"}}></i>
                         <p className = "grey-text float-start me-2">{profile.location}</p>

                     </div>
                     {currentUser && (
                         <buttton className = "btn bg-secondary mt-5 ms-3 float-start" onClick = {handleFollowButtonClick}>
                             <i className= {`fa-solid ${followRelationship ? 'fa-check' : 'fa-plus'} fa-lg trailer-icon`} style={{color: "#f5f5f5"}}></i>
                             <span className=" ms-1 white-text">
                                {followRelationship ? 'Following' : 'Follow'}
                            </span>
                         </buttton>)
                     }

                 </div>
                 <div className = "col-4">
                     <div className = "mt-5 float-start bi-border-right">
                         <ProfileStatItem label={"Followers"} number={profile.followersCount}/>
                     </div>
                     <div className = "mt-5 float-start">
                         <ProfileStatItem label={"Following"} number={profile.followingCount}/>
                     </div>
                 </div>
                 <div className  = 'col-2'>
                     {profile && currentUser && profile.username === currentUser.username &&
                         (
                             <button
                                 className = "btn btn-secondary mt-5"
                                onClick = {handleEditProfileButtonClick}
                                >Edit Profile
                             </button>
                         )
                     }
                 </div>

             </div>
             <div className = "row">
                 <ul className="nav nav-highlight justify-content-center border-secondary border-top-2 border-bottom-2 border-1 m-0 p-0">
                     <li className="nav-item">
                         <a className="grey-underline ms-3 me-3 active" aria-current="page" href="#">
                             Profile
                         </a>
                     </li>
                     <li className="nav-item">
                         <Link className = "text-decoration-none" to={`/profile/${username}/reviews`}>
                             <a className="grey-no-underline ms-3 me-3">
                                 Reviews
                             </a>
                         </Link>
                     </li>
                     <li className="nav-item">
                         <Link className = "text-decoration-none" to={`/profile/${username}/watchlist`}>
                             <a className="grey-no-underline ms-3 me-3">
                                 Watchlist
                             </a>
                         </Link>
                     </li>
                     <li className="nav-item">
                         <Link className = "text-decoration-none" to={`/profile/${username}/favorites`}>
                             <a className="grey-no-underline ms-3 me-3">
                                 Favorites
                             </a>
                         </Link>
                     </li>
                     <li className="nav-item">
                         <a className="grey-no-underline ms-3 me-3" href="#">
                             Followers
                         </a>
                     </li>
                     <li className="nav-item">
                         <a className="grey-no-underline ms-3 me-3" href="#">
                             Following
                         </a>
                     </li>
                 </ul>


             </div>
             <div className = "row mt-2">
                 <div className = "col-md-9">
                     <div className="row">
                         <div className="col">
                             <h5 className="white-font ms-2 border-bottom">Favorites</h5>
                         </div>
                         <div className="col">
                             <h4 className="white-font float-end me-2"></h4>
                         </div>
                         <div>
                             <FavoritesScrollBar favorites={profile.favoriteMovies} profile = {profile} currentUser = {currentUser}/>
                         </div>
                     </div>
                     <div className="row">
                         <div className="col">
                             <h5 className="white-font ms-2 mt-2 border-bottom">Recent Reviews</h5>
                         </div>
                         <div className="col">
                             <h4 className="white-font float-end me-2"></h4>
                         </div>
                         {/* Conditionally render ProfileReviewList */}
                         {reviews !== null ? (
                             <div>
                                 <ProfileReviewList reviews={reviews} />
                             </div>
                         ) : (
                             <div className = "">
                                 <h5 className = "white-font ms-5">Loading reviews...</h5>
                             </div>
                         )}
                     </div>
                 </div>
                 <div className = "col-md-3" >
                     <h5 className="white-font justify-content-center border-bottom">Bio</h5>
                     <p className = "white-font"> {profile.bio}</p>
                     <h5 className="white-font justify-content-center border-bottom">Followers</h5>
                     <FollowerGrid data={profile.followers}/>
                     <br></br>
                     <h5 className="white-font justify-content-center border-bottom">Following</h5>
                     <FollowingGrid data={profile.following}/>

                 </div>
             </div>
         </div>
</div>
);
}
export default ProfileScreen;



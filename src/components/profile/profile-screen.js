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
import {getBaseProfileByUsername} from "../../services/users-service";
import {Link} from "react-router-dom";
function ProfileScreen() {
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(null);
    const [reviews,setReviews] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {username} = useParams()
    console.log('username in ProfileScreen', username);
    console.log('currentUser in profileScreen', currentUser);

    const handleEditProfileButtonClick = ()=> {
        navigate('/profile/settings')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {currentUser} = await dispatch(profileThunk())
                const userProfile = await getBaseProfileByUsername(username)
                setProfile(userProfile);
                console.log("set profile in profile screen to ", profile);

                // get some user reviews too for profile
                console.log('uid of user in profile screen', userProfile._id);

                const userReviews = await getReviewsByUserId(userProfile._id);
                setReviews(userReviews);
                console.log('user reviews: ', userReviews);

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
                 <div className = "col-8">
                     <h4 className = "white-font mt-5">{profile.username}</h4>
                     <i className="fa-solid fa-location-dot float-start me-2" style = {{color:"grey"}}></i>
                     <p className = "grey-text float-start me-2">{profile.location}</p>

                 </div>
                 <div className  = 'col-2'>
                     <p className="grey-text ms-2 mt-5">{profile.role}</p>
                     {profile && currentUser && profile.username === currentUser.username &&
                         (
                             <button
                                 className = "btn btn-secondary"
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
                             <h5 className="white-font ms-2">Favorites</h5>
                         </div>
                         <div className="col">
                             <h4 className="white-font float-end me-2"></h4>
                         </div>
                         <div>
                             <FavoritesScrollBar favorites={profile.favoriteMovies} profile = {profile}/>
                         </div>
                     </div>
                     <div className="row">
                         <div className="col">
                             <h5 className="white-font ms-2 mt-2">Recent Reviews</h5>
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
                     <h5 className="white-font justify-content-center border-bottom">Biography</h5>
                     <p className = "white-font"> {profile.bio}</p>

                 </div>
             </div>
         </div>
</div>
);
}
export default ProfileScreen;



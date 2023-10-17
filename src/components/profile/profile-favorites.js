import {useParams} from "react-router";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import NavigationSidebar from "../navigation";
import {getBaseProfileByUsername, getFavoritesByUsername} from "../../services/users-service";
import ProfileFavoriteItem from "./profile-favorite-item";
function ProfileFavorites () {
    const { currentUser } = useSelector((state) => state.user);
    const [data,setData] = useState(null);
    const { username } = useParams();
    const [profile,setProfile] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFavoritesByUsername(username);
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
        return (<h4 className = 'white-font justify-content-center'> Loading Favorites</h4>)
    }
    else if (data.favoriteMovies.length === 0) {
        return (<h4 className = "white-font justify-content-center">{username} has no movies in favorites, how sad</h4>)
    }
    console.log("current user in profileFavorites",profile)
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
                                <a className="grey-no-underline ms-3 me-3">
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
                            <a className="grey-underline ms-3 me-3" href="#">
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
                <div className="row">
                    <h5 className = "white-font">{data.username}'s Favorite Movies</h5>
                    {data.favoriteMovies.map((element, index) => (
                        <Link to={`/movies/movie/${element.movieId}`} className= "text-decoration-none col-lg-2 col-md-3 col-sm-12">
                            <div key={index} className="">
                                <ProfileFavoriteItem favorite={element}/>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    )
}
export default ProfileFavorites;
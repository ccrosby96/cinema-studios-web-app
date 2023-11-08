import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function ProfilePageBar ({username, profilePic, section}) {

    return (
    <div className = "row bg-dark mt-1">

        <ul className="nav nav-highlight justify-content-center border-secondary border-top-2 border-bottom-2 border-1 m-0 p-0">
            <li clasName = "nav-item float-start m-0 p-0">

                <img className="img-fluid avatar-top-bar p-3" src={profilePic} style = {{width: "100px",height: "100px"}}/>

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
                    <a className= {section === "reviews" ? "grey-underline ms-3 me-3" : "grey-no-underline ms-3 me-3"}>
                        Reviews
                    </a>
                </Link>
            </li>
            <li className="nav-item mt-4 pt-2">
                <Link className = "text-decoration-none" to={`/profile/${username}/watchlist`}>
                    <a className= {section === "watchlist" ? "grey-underline ms-3 me-3" : "grey-no-underline ms-3 me-3"}>
                        Watchlist
                    </a>
                </Link>
            </li>
            <li className="nav-item mt-4 pt-2">
                <Link className= "text-decoration-none" to = {`/profile/${username}/favorites`}>
                    <a className= {section === "favorites" ? "grey-underline ms-3 me-3" : "grey-no-underline ms-3 me-3"}>
                        Favorites
                    </a>
                </Link>
            </li>
            <li className="nav-item mt-4 pt-2">
                <Link className= "text-decoration-none" to = {`/profile/${username}/followers/1`}>
                    <a className={section === "followers" ? "grey-underline ms-3 me-3" : "grey-no-underline ms-3 me-3"}>
                        Followers
                    </a>
                </Link>
            </li>
            <li className="nav-item mt-4 pt-2">
                <Link className= "text-decoration-none" to = {`/profile/${username}/following/1`}>
                    <a className= {section === "following" ? "grey-underline ms-3 me-3" : "grey-no-underline ms-3 me-3"}>
                        Following
                    </a>
                </Link>
            </li>
        </ul>
    </div>);
}
export default ProfilePageBar;
import {Link} from "react-router-dom";
import style from "../../styles/navigation.css"
import {useDispatch, useSelector} from "react-redux";
import ReviewPostForm from "../reviews/review-post-form";
import {logoutThunk} from "../../thunks/users-thunks";
import {useNavigate} from "react-router";
import popcornImage from '../../images/popcorn.png';

const NavigationSidebar = (
) => {
    const { currentUser } = useSelector((state) => state.user);
    //console.log("in navbar componenent, user is", currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <Link className = "text-decoration-none me-2 p-2 ms-1" to = "/search">
                <img src = {popcornImage}
                     style = {{height: "40px",width:"40px"}}
                    className = ""/>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item mt-1">

                            <Link  className="text-decoration-none" to = "/movies/discover">
                                <span className="text-light"> Movies</span>

                            </Link>

                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="#">TV Shows</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="#">People</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href={currentUser ? `/profile/${currentUser.username}` : '/profile'}>Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href={"/ai-search"}>AI</a>
                    </li>
                    {currentUser ? (
                        <li className="nav-item ml-auto " onClick={() => {
                            dispatch(logoutThunk());
                            navigate("/login");
                        }}>
                            <a className="nav-link text-light" href="/login">Logout</a>
                        </li>
                    ) : (
                        <li className="nav-item ml-auto">
                            <a className="nav-link text-light" href="/login">Login</a>
                        </li>
                    )}



                </ul>
            </div>
        </nav>

    );

};
export default NavigationSidebar
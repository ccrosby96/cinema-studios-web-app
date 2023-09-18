import {Link} from "react-router-dom";
import style from "../../styles/navigation.css"
import {useSelector} from "react-redux";
const NavigationSidebar = (
) => {
    const { currentUser } = useSelector((state) => state.user);


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <a className="navbar-brand" href="/search">Cinema Studios</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active mt-1">
                        <Link  className="text-decoration-none" to = "/search">
                            <span className="text-light"> Home</span>

                        </Link>

                    </li>
                    <li className="nav-item mt-1">

                            <Link  className="text-decoration-none" to = "/movies/discover">
                                <span className="text-light"> Movies</span>

                            </Link>

                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">TV Shows</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">People</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/profile">Profile</a>
                    </li>
                    <li className="nav-item ml-auto">
                        <a className="nav-link" href="/login">Login</a>
                    </li>

                </ul>
            </div>
        </nav>

    );

};
export default NavigationSidebar
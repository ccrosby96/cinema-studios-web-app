import {formatDate} from "../../helper_functions/helper_functions";
import {truncateString} from "../../helper_functions/helper_functions";
import {Link} from "react-router-dom";

function WatchListItem ({movie,key,onRemove})  {

    const url = "https://image.tmdb.org/t/p/w500";
    const overview = truncateString(movie.movieDescription, 120) + "...";
    const handleRemoveClick = () => {
        // Call the onRemove prop to remove the movie by its ID
        onRemove(movie.movieId);
    };
    return (
        <div className = "list-group-item m-1 rounded-3">
            <div className = "container p-0 m-0">
                <div className = "row">

                    <div className = "col-4 p-0 m-0">
                        <Link to = {`/movies/movie/${movie.movieId}`} className = "text-decoration-none m-0 p-0">
                            <img className=" img-fluid m-0 p-0 rounded-3"  src= {url + movie.posterPic} alt="Image Not Found"/>
                        </Link>
                    </div>
                    <div className = "col-8 p-0 m-0 ps-1">
                        <div className="m-0 p-0">

                            <i className="btn fa-solid fa-x float-end m-0 p-0 nudge-up"
                               onClick={handleRemoveClick}></i>

                                <h5 className="mb-0 pb-0 float-start mb-0 mt-0 pt-0">{movie.movieTitle}</h5>

                            <br></br>

                            <span className = "grey-text mt-0 pt-0">{formatDate(movie.releaseDate)}</span>
                            <p className="">{overview}</p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default WatchListItem
import {Link} from "react-router-dom";
import WatchListItem from "./watch-list-item";

function MovieWatchList({movies}){
    console.log('movies in watchlist', movies);
    return (
        <>
            <ul className= "list-group no-bullets">
                {
                    movies.map((movie, i) => {

                        return (
                            <Link to = {`/movies/movie/${movie.movieId}`} className = "text-decoration-none">
                                <WatchListItem movie={movie}/>
                            </Link>
                        )
                    })
                }
            </ul>
        </>
    );

}
export default MovieWatchList;
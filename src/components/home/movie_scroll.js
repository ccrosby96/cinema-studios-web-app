import MovieTile from "./movie_tile";
import MovieRecTile from "../recommendations/movie_rec_tile";
import MovieSearchTile from "../movie-grid/movie-tile";
import {Link} from "react-router-dom";


function MovieScrollBar({movies}) {

    //console.log("films in movieScrollBar component",movies);
    return (
        <>
            <div className="scroll_media-scroller snaps-inline">
                {
                     movies.map((movie, i) => {

                        return (
                            <Link to = {`/movies/movie/${movie.id}`} className = "text-decoration-none">
                                <MovieSearchTile movie={movie}/>
                            </Link>
                        )
                    })
                }
            </div>

        </>
    );
}

export default MovieScrollBar;

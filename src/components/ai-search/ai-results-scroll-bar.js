
import MovieTile from "./ai-scroll-movie-tile";
import {Link} from "react-router-dom";
import MovieRecTile from "../recommendations/movie_rec_tile";
function AIResultsScroll({results}) {

    if (results === null || results.length === 0) {
        return (<></>);
    }
    return (
        <>
                {
                    <div className="row">
                        {results.map((element, index) => (
                            <Link to={`/movies/movie/${element.id}`} className= "text-decoration-none col-lg-2 col-md-3 col-sm-12">
                                <div key={index} className="">
                                    <MovieRecTile movie = {element}/>
                                </div>
                            </Link>
                        ))}
                    </div>
                }
        </>
    );
}

export default AIResultsScroll;

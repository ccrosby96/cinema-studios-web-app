import MovieScrollBar from "./movie_scroll";
import SearchResults from "./search-results";
import MovieGrid from "./movie_grid";
import trending from "./trending.json"
import popular from "./popular.json"
import results from "./search-results.json"
import SearchMovieGrid from "../movie-grid/search-movie-grid";
import {Link} from "react-router-dom";
import MovieRecTile from "../recommendations/movie_rec_tile";
function InitialMovies() {
    const data = trending.results
    const res = popular.results

    return (
        <div className = "container">
            <div className = "row">
                <span className="a1-font-25px fw-bold white-font"> Trending</span>

                <MovieScrollBar movies = {data}/>

                <span className="a1-font-25px fw-bold white-font"> Popular</span>
                <div className = "row bg-dark rounded-3 p-1">
                    {res.map((element, index) => (
                        <Link to={`/movies/movie/${element.id}`} className= "text-decoration-none col-lg-2 col-md-3 col-sm-6">
                            <div key={index} className="">
                                <MovieRecTile movie = {element}/>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>

        </div>)

}
export default InitialMovies;
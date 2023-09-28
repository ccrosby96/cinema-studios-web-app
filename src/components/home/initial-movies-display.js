import MovieScrollBar from "./movie_scroll";
import SearchResults from "./search-results";
import MovieGrid from "./movie_grid";
import trending from "./trending.json"
import popular from "./popular.json"
import results from "./search-results.json"
import SearchMovieGrid from "../movie-grid/search-movie-grid";
function InitialMovies() {
    const data = trending.results
    const res = popular.results

    return (
        <div>
            <span className="a1-font-25px fw-bold white-font"> Trending</span>

            <MovieScrollBar movies = {data}/>

            <span className="a1-font-25px fw-bold white-font"> Popular</span>

            <SearchMovieGrid movies = {res}/>
        </div>)

}
export default InitialMovies;
import MovieScrollBar from "./movie_scroll";
import SearchResults from "./search-results";
import MovieGrid from "./movie_grid";
import trending from "./trending.json"
import popular from "./popular.json"
import results from "./search-results.json"

function InitialMovies() {
    const data = trending.results
    const res = results.results

    return (
        <div>
            <span className="a1-font-25px fw-bold"> Trending</span>

            <MovieScrollBar movies = {data}/>
            <span className="a1-font-25px fw-bold"> Popular</span>

            <MovieGrid movies = {res}/>
        </div>)

}
export default InitialMovies;
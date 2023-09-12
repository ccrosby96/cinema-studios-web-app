



import SearchBar from "./search-bar";
import NavigationSidebar from "../navigation";
import InitialMovies from "../home/initial-movies-display";
import SearchMovieGrid from "../movie-grid/search-movie-grid";
import popular from "../home/popular.json"
import trending from "../home/trending.json"
import MovieScrollBar from "../home/movie_scroll";

function LandingSearchPage () {

    const handleSearch = () => {
        // Implement your search functionality here
        alert('Searching...');
    };
    const res = popular.results;
    const trend = trending.results;

    return (
      <div className = "bg-color">
          <NavigationSidebar/>

          <SearchBar/>
          <div className="container">
              <h5> Trending Movies</h5>
              <MovieScrollBar movies={trend}/>
              <div className = "row justify-content-center align-content-center">
                  <h5>Popular Movies</h5>
                  <SearchMovieGrid movies = {res}/>
              </div>
          </div>
      </div>

    );
}
export default LandingSearchPage;
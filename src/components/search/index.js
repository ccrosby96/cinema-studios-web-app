



import SearchBar from "./search-bar";
import NavigationSidebar from "../navigation";
import InitialMovies from "../home/initial-movies-display";
import SearchMovieGrid from "../movie-grid/search-movie-grid";
import popular from "../home/popular.json"
import trending from "../home/trending.json"
import MovieScrollBar from "../home/movie_scroll";
import {useSelector} from "react-redux";

function LandingSearchPage () {

    const res = popular.results;
    const trend = trending.results;
    const { currentUser } = useSelector((state) => state.user);

    console.log(currentUser);

    return (
      <div className = "textured-background">
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
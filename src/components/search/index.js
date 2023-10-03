



import SearchBar from "./search-bar";
import NavigationSidebar from "../navigation";
import popular from "../home/popular.json"
import trending from "../home/trending.json"
import MovieScrollBar from "../home/movie_scroll";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPopularMovies} from "../../services/movie-service";
import {Link} from "react-router-dom";
import MovieRecTile from "../recommendations/movie_rec_tile";

function LandingSearchPage () {

    const res = popular.results;
    const trend = trending.results;
    const { currentUser } = useSelector((state) => state.user);
    const [popularResults,setPopularResults] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if the page number is not in the dictionary
                const popularMovies = await fetchPopularMovies();
                console.log("in LandingSearchPage, popular results are", popularMovies.results);
                setPopularResults(popularMovies.results);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency ar

    console.log(currentUser);
    if (popularResults === null) {
        return (
            <h5 className = "white-font">Loading Data</h5>
        )
    }
    return (
      <div className = "bg-landing-page">
          <NavigationSidebar/>

          <SearchBar/>
          <div className="container justify-content-center">
              <h5 className = "white-font"> Upcoming Movies</h5>
              <MovieScrollBar movies={trend}/>

              <h5 className = "white-font">Popular Movies</h5>
              <div className="row">
                  {popularResults.map((element, index) => (
                      <Link to={`/movies/movie/${element.id}`} className= "text-decoration-none col-lg-2 col-md-3 col-sm-12">
                          <div key={index} className="">
                              <MovieRecTile movie = {element}/>
                          </div>
                      </Link>
                  ))}
              </div>

          </div>
      </div>

    );
}
export default LandingSearchPage;
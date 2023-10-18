



import SearchBar from "./search-bar";
import NavigationSidebar from "../navigation";
import popular from "../home/popular.json"
import trending from "../home/trending.json"
import MovieScrollBar from "../home/movie_scroll";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPopularMovies, fetchUpcomingMovies} from "../../services/movie-service";
import {Link} from "react-router-dom";
import MovieRecTile from "../recommendations/movie_rec_tile";

function LandingSearchPage () {

    const [popularResults,setPopularResults] = useState(null)
    const [upcomingResults,setUpcomingResults] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if the page number is not in the dictionary
                const popularMovies = await fetchPopularMovies();
                const upcomingMovies = await fetchUpcomingMovies();
                console.log("in LandingSearchPage, popular results are", popularMovies.results);
                setPopularResults(popularMovies.results);
                setUpcomingResults(upcomingMovies.results);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency ar

    if (popularResults === null || upcomingResults === null) {
        return (
            <h5 className = "white-font">Loading Data</h5>
        )
    }
    return (
      <div className = "bg-landing-page">
          <NavigationSidebar/>

          <SearchBar/>
          <div className="container justify-content-center">
              <h5 className = "white-font border-bottom"> Upcoming Movies</h5>
              <MovieScrollBar movies={upcomingResults}/>

              <h5 className = "white-font border-bottom">Popular Movies</h5>
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
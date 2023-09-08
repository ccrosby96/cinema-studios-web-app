import { useLocation, useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import MovieResultsList from "../search/movie-results-list";
import NavigationSidebar from "../navigation";

function MultiSearchResultsPage() {
    const MultiResults = useSelector(state => state.multiSearch)
    const movieResults = useSelector(state => state.multiSearch.results.movies)
    console.log(MultiResults);
    console.log(movieResults)
    const  q  = useParams();
    const [searchResults, setSearchResults] = useState([]);
    console.log("In multi search landing page")
    console.log(q)
    const query = q.q;
    console.log(query);

    return (

        <di>
            <NavigationSidebar/>
            <div className = "container">

            <div className = "row" >
                <div className = "col-2" >
                    Movies
                    TV
                    People
                </div>
                <div className = "col-10">
                    <h2>Search Results for: {query}</h2>
                    <MovieResultsList movies = {movieResults}/>

                </div>
            </div>
            </div>

            {/* Render the search results using the searchResults state */}
        </di>

    );
}
export default MultiSearchResultsPage

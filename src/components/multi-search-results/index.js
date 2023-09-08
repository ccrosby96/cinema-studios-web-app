import { useLocation, useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import MovieResultsList from "../search/movie-results-list";
import NavigationSidebar from "../navigation";
import TvResultsList from "../search/tv-results-list";

function MultiSearchResultsPage() {
    const MultiResults = useSelector(state => state.multiSearch)
    const movieResults = useSelector(state => state.multiSearch.results.movies)
    const tvResults = useSelector(state => state.multiSearch.results.tv)
    const peopleResults = useSelector(state => state.multiSearch.results.people)
    console.log(movieResults)
    console.log(tvResults)
    const  q  = useParams();
    const [searchResults, setSearchResults] = useState([]);
    console.log("In multi search landing page")
    console.log(q)
    const query = q.q;
    console.log(query);
    const [selectedItem, setSelectedItem] = useState('Movie');
    const handleItemClick = (item) => {
        setSelectedItem(item);
    }

    return (

        <di>
            <NavigationSidebar/>
            <div className = "container">

            <div className = "row" >
                <div className = "col-2" >
                    <h2>Results Type: {selectedItem}</h2>
                    <div className="card">
                        <div className="card-header">Select a Type</div>
                        <ul className="list-group list-group-flush">
                            <li
                                className={`list-group-item ${selectedItem === 'Movie' ? 'active' : ''}`}
                                onClick={() => handleItemClick('Movie')}
                            >
                                Movies
                            </li>
                            <li
                                className={`list-group-item ${selectedItem === 'TV' ? 'active' : ''}`}
                                onClick={() => handleItemClick('TV')}
                            >
                                TV
                            </li>
                            <li
                                className={`list-group-item ${selectedItem === 'People' ? 'active' : ''}`}
                                onClick={() => handleItemClick('People')}
                            >
                                People
                            </li>
                        </ul>
                    </div>
                </div>
                <div className = "col-10">
                    <h2>Search Results for: {query}</h2>
                    {selectedItem === 'Movie' ? (
                        <MovieResultsList movies = {movieResults} />
                    ) : selectedItem === 'TV' ? (
                        <TvResultsList shows = {tvResults} />
                    ) : null}
                </div>
            </div>
            </div>

            {/* Render the search results using the searchResults state */}
        </di>

    );
}
export default MultiSearchResultsPage

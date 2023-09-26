import { useLocation, useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import MovieResultsList from "../search/movie-results-list";
import NavigationSidebar from "../navigation";
import TvResultsList from "../search/tv-results-list";
import PeopleResultsList from "../search/people-results-list";
import SearchBar from "../search/search-bar";

function MultiSearchResultsPage() {
    const MultiResults = useSelector(state => state.multiSearch)
    const movieResults = useSelector(state => state.multiSearch.results.movies)
    const tvResults = useSelector(state => state.multiSearch.results.tv)
    const peopleResults = useSelector(state => state.multiSearch.results.people)

    const  q  = useParams();
    const [searchResults, setSearchResults] = useState([]);
    console.log("In multi search landing page")
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
                <div className = "col-2 mt-5" >
                    <h5>Results Type: {selectedItem}</h5>
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
                <div className="col-10">
                    <SearchBar/>

                    {selectedItem === 'Movie' ? (
                        <MovieResultsList movies={movieResults} />
                    ) : selectedItem === 'TV' ? (
                        <TvResultsList shows={tvResults} />
                    ) : selectedItem === 'People' ? (
                        <PeopleResultsList people={peopleResults} />
                    ) : (
                        <p>No results found for the selected item.</p> // Fallback for other cases
                    )}
                </div>

            </div>
            </div>

        </di>

    );
}
export default MultiSearchResultsPage

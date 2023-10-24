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

    console.log(MultiResults);
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

        <div className = "bg-landing-page">
            <NavigationSidebar/>
            <div className = "container">
            <div className = "row" >
                <SearchBar/>
                <div className = "col-2" >
                    <div className="card mt-2">
                        <div className="card-header bg-secondary white-font">
                            <span className="white-font">Select A Type</span>
                        </div>
                        <ul className="list-group list-group-flush bg-secondary border-0 ">
                            <li
                                className={`list-group-item border-0 ${selectedItem === 'Movie' ? 'active' : 'bg-secondary'}`}
                                onClick={() => handleItemClick('Movie')}
                            >
                                <span className="white-font">Movies</span>
                            </li>
                            <li
                                className={`list-group-item border-0 ${selectedItem === 'TV' ? 'active' : 'bg-secondary'}`}
                                onClick={() => handleItemClick('TV')}
                            >
                                <span className="white-font">TV</span>
                            </li>
                            <li
                                className={`list-group-item ${selectedItem === 'People' ? 'active' : 'bg-secondary'}`}
                                onClick={() => handleItemClick('People')}
                            >
                                <span className="white-font">People</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-10 mt-1">

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

        </div>

    );
}
export default MultiSearchResultsPage

import NavigationSidebar from "../navigation";
import SearchResults from "./search-results";
import {useState} from "react";
import Slider from "../rating_scroll_bar/scrollable_bar";
import { useDispatch, useSelector } from 'react-redux';
import FilterSidebar from "./filter-sidebar";
import {movieDiscoverSearch} from "../../services/movie-service";
import {fetchMovieSearchResults} from "../../thunks/movie-thunks";
import InitialMovies from "./initial-movies-display";
import {Link} from "react-router-dom";
function MovieHome() {
    const dispatch = useDispatch();
    const searchFilters = useSelector(state => state.filters)
    const searchResults = useSelector(state => state.searchResults.results)
    const loading = useSelector (state => state.searchResults.loading)


    const handleSearch = () => {
        // Assuming you have search parameters (e.g., search text, filters) to pass
        const searchParams = {
            searchText: '',
            filters: searchFilters
        };
        console.log('search params created in handleSearch', searchParams);

        // Dispatch the async action to fetch movie search results
        dispatch(fetchMovieSearchResults(searchParams));
    };

    return (
        <>
            <div className="row p-0 m-0 bg-landing-page">
                <NavigationSidebar/>
                <div className="container">
                    <div className="row">
                        <div className = 'col-2'>
                            <FilterSidebar/>
                            <Link to = {`/movies/discover/1`} className = "ms-2">
                                <button onClick={handleSearch} className="btn btn-secondary mt-3">
                                    Search
                                </button>
                            </Link>
                        </div>
                        <div className = 'col-10'>
                            {loading === true ? (
                                // Show that we're loading
                                <span>Loading Results Holup</span>
                            ) : searchResults.length === 1 ? (
                                // No search done yet, load default popular and trending movies
                                <InitialMovies/>
                            ) : (
                                // Render ComponentC for all other cases
                                <SearchResults/>
                            )}
                        </div>
                    </div>
                    <div className="row">

                        Cinema Studios
                    </div>
                </div>

            </div>
        </>
    );
}
export default MovieHome;
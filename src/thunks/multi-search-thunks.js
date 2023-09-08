import {
    setSearchUrl,
    setMultiSearchResults,
    clearMultiSearchResults,
    setMultiSearchTVPage, setMultiSearchMoviePage, setMultiSearchPeoplePage,
} from "../reducers/actions";
import {multiSearch, multiGetSearch} from "../services/multi-search-service";
import {FETCH_MULTI_SEARCH_RESULTS_REQUEST, FETCH_MULTI_SEARCH_RESULTS_SUCCESS,
    FETCH_MULTI_SEARCH_RESULTS_FAILURE} from "../reducers/actionTypes";

export const fetchMultiSearchResults = (searchParams) => {
    return async (dispatch) => {
        try {
            // Dispatch a loading action
            dispatch({ type: FETCH_MULTI_SEARCH_RESULTS_REQUEST });

            // Make a request to your backend API
            console.log("searchParams in fetchMultiSearchResults", searchParams)
            const data = await multiGetSearch(searchParams)

            const results = data.results;
            const totalPages = data.total_pages;
            console.log("fetchingmoviesearch totalPages", totalPages)
            console.log('url in fetchingmoviesthunk', data.url)
            // Dispatch the search results to Redux
            // this is a new search, clear old search results
            dispatch(clearMultiSearchResults())
            dispatch(setMultiSearchResults(results))
            dispatch(setSearchUrl(data.url));
            dispatch(setMultiSearchTVPage(1));
            dispatch(setMultiSearchMoviePage(1));
            dispatch(setMultiSearchPeoplePage(1));
            // Optionally, you can dispatch the current page and max page here if needed
            // Dispatch a success action (optional)
            dispatch({ type: FETCH_MULTI_SEARCH_RESULTS_SUCCESS });
        } catch (error) {
            // Handle errors and dispatch an error action (optional)
            dispatch({ type: FETCH_MULTI_SEARCH_RESULTS_FAILURE, error });
        }
    };
};
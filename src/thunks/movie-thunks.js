import {createAsyncThunk} from "@reduxjs/toolkit"
import * as service from "../services/movie-service"
import {
    setSearchResults,
    setCurrentPage,
    setMaxPage,
    setSearchUrl,
    appendToResults,
    clearSearchResults
} from "../reducers/actions";
import {movieDiscoverSearch, movieDiscoverSearchNextPage} from "../services/movie-service";

export const fetchMovieSearchResults = (searchParams) => {
    return async (dispatch) => {
        try {
            // Dispatch a loading action (optional)
            dispatch({ type: 'FETCH_SEARCH_RESULTS_REQUEST' });

            // Make a request to your backend API
            console.log("searchParams in fetchMovieSearchResults", searchParams)
            const data = await movieDiscoverSearch(searchParams)

            console.log("fetching next page in thunk: ", data)

            const totalPages = data.total_pages;
            console.log("fetchingmoviesearch totalPages", totalPages)
            console.log('url in fetchingmoviesthunk', data.url)
            // Dispatch the search results to Redux
            // this is a new search, clear old search results
            // and then add first new page of results
            // store = [[dummypage], [data.results]]
            dispatch(clearSearchResults())
            dispatch(appendToResults(data.results))
            dispatch(setSearchUrl(data.url));
            dispatch(setCurrentPage(1))
            dispatch(setMaxPage(totalPages))
            // Optionally, you can dispatch the current page and max page here if needed
            // Dispatch a success action (optional)
            dispatch({ type: 'FETCH_SEARCH_RESULTS_SUCCESS' });
        } catch (error) {
            // Handle errors and dispatch an error action (optional)
            dispatch({ type: 'FETCH_SEARCH_RESULTS_FAILURE', error });
        }
    };
};

export const fetchMovieSearchNextPage = (searchParams) => {
    return async (dispatch) =>{
        try {
            // Dispatch a loading action (optional)
            dispatch({ type: 'FETCH_SEARCH_RESULTS_REQUEST' });

            // Make a request to your backend API
            console.log("searchParams in fetchMovieSearchResults", searchParams)
            const data = await movieDiscoverSearchNextPage(searchParams)

            console.log("fetchingmoviesearch results data: ", data)
            const nextPage = data.nextPage;
            // Dispatch the search results to Redux
            dispatch(appendToResults(data.results));
            // Update current page to the next page, the page from data above
            dispatch(setCurrentPage(nextPage));

            // Dispatch a success action (optional)
            dispatch({ type: 'FETCH_SEARCH_RESULTS_SUCCESS' });
        } catch (error) {
            // Handle errors and dispatch an error action (optional)
            dispatch({ type: 'FETCH_SEARCH_RESULTS_FAILURE', error });
        }
};

}

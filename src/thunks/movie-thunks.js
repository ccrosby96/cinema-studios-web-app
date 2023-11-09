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
import {movieDiscoverSearch, movieDiscoverSearchNextPage,movieDiscoverSearchByPage} from "../services/movie-service";

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
            const lastPage = Math.ceil(totalPages / 2);
            console.log("fetchingmoviesearch totalPages", totalPages)
            console.log('url in fetchingmoviesthunk', data.url)
            // Dispatch the search results to Redux
            // this is a new search, clear old search results
            // and then add first new page of results
            // store = [[dummypage], [data.results]]
            dispatch(clearSearchResults())
            dispatch(appendToResults(1,data.results))
            dispatch(setSearchUrl(data.url));
            dispatch(setCurrentPage(1))
            dispatch(setMaxPage(lastPage))
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

            const nextPage = data.nextPage;

            // Dispatch the search results to Redux
            dispatch(appendToResults(nextPage,data.results));
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
export const fetchMovieSearchByPage = (searchParams) => {
    console.log("called fetchMovieSearchByPage");
    return async (dispatch) =>{
        try {
            // Dispatch a loading action (optional)
            dispatch({ type: 'FETCH_SEARCH_RESULTS_REQUEST' });

            // Make a request to your backend API
            console.log("searchParams in fetchMovieSearchByPage", searchParams)
            const data = await movieDiscoverSearchByPage(searchParams)
            const requestedPage = data.requestedPage;

            // Dispatch the search results to Redux
            dispatch(appendToResults(requestedPage,data.results));
            // Update current page to the next page, the page from data above
            dispatch(setCurrentPage(requestedPage));

            // Dispatch a success action (optional)
            dispatch({ type: 'FETCH_SEARCH_RESULTS_SUCCESS' });
        } catch (error) {
            // Handle errors and dispatch an error action (optional)
            dispatch({ type: 'FETCH_SEARCH_RESULTS_FAILURE', error });
        }
    };
}

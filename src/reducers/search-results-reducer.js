// reducer.js
import {
    SET_SEARCH_RESULTS,
    CLEAR_SEARCH_RESULTS,
    SET_MAX_PAGE,
    SET_CURRENT_PAGE,
    SET_SEARCH_URL,
    APPEND_TO_RESULTS
} from './actionTypes';

const initialState = {
    results: [[]], // Initially, no search results, and we use index results array as page number
    url : "",
    currentPage: 0,
    maxPage: 0,
    loading: false, // Add loading state
    error: null, // Add error state
};

const searchResultsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                results: [[]],
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };

        case SET_SEARCH_URL:
            return {
                ...state,
                url: action.payload,
            }
        case SET_MAX_PAGE:
            return {
                ...state,
                maxPage: action.payload,
            };
        // Handle loading and error states if needed
        case 'FETCH_SEARCH_RESULTS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_SEARCH_RESULTS_SUCCESS':
            return {
                ...state,
                loading: false,
            };
        case 'FETCH_SEARCH_RESULTS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case APPEND_TO_RESULTS:
            return {
                ...state,
                results: [...state.results, action.payload], // Append data to the results list
            };
        default:
            return state;
    }
};

export default searchResultsReducer;

import {
    CLEAR_SEARCH_RESULTS,
    SET_MAX_PAGE,
    SET_SEARCH_URL,
    SET_MULTI_SEARCH_RESULTS,
    SET_MULTI_SEARCH_PEOPLE_PAGE,
    SET_MULTI_SEARCH_TV_PAGE,
    SET_MULTI_SEARCH_MOVIE_PAGE,
    APPEND_TO_TV_MULTI_SEARCH_RESULTS,
    APPEND_TO_MOVIE_MULTI_SEARCH_RESULTS,
    APPEND_TO_PEOPLE_MULTI_SEARCH_RESULTS,
    FETCH_MULTI_SEARCH_RESULTS_REQUEST, FETCH_MULTI_SEARCH_RESULTS_FAILURE
} from "./actionTypes";

const initialState = {
    results: {
        movies: [],
        tv: [],
        people: []}
    ,
    url : "",
    currentMoviePage: 0,
    currentTVPage: 0,
    currentPeoplePage: 0,
    maxPage: 0,
    loading: false, // Add loading state
    error: null, // Add error state
};
const MultiSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MULTI_SEARCH_RESULTS:
            return {
                ...state,
                results: action.payload,
            };
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                results: {
                    movies: [],
                    tv: [],
                    people: []},

            };
        case SET_MULTI_SEARCH_MOVIE_PAGE:
            return {
                ...state,
                currentMoviePage: action.payload,
            };
        case SET_MULTI_SEARCH_TV_PAGE:
            return {
                ...state,
                currentTVPage: action.payload,
            };
        case SET_MULTI_SEARCH_PEOPLE_PAGE:
            return {
                ...state,
                currentPeoplePage: action.payload,
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
        case FETCH_MULTI_SEARCH_RESULTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_MULTI_SEARCH_RESULTS_REQUEST:
            return {
                ...state,
                loading: false,
            };
        case FETCH_MULTI_SEARCH_RESULTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case APPEND_TO_MOVIE_MULTI_SEARCH_RESULTS:
            return {
                ...state, // Copy the existing state
                results: {
                    ...state.results, // Copy the existing results object
                    movies: [...state.results.movies, action.payload], // Add the new movie to the movies array
                },
            };
        case APPEND_TO_TV_MULTI_SEARCH_RESULTS:
            return {
                ...state,
                results: {
                    ...state.results,
                    tv: [...state.results.tv, action.payload],
                }
            }
        case APPEND_TO_PEOPLE_MULTI_SEARCH_RESULTS:
            return {
                ...state,
                results: {
                    ...state.results,
                    people: [...state.results.people, action.payload],
                }
            }
        default:
            return state;
    }
};
export default MultiSearchReducer
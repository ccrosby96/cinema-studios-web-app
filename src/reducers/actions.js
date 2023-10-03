// actions.js
import {
    TOGGLE_GENRE_FILTER, TOGGLE_RATING_FILTER, SET_RELEASE_YEARS,
    SET_AUDIENCE_SCORE, SET_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS,
    SET_MAX_PAGE, SET_CURRENT_PAGE, SET_SEARCH_URL, APPEND_TO_RESULTS,SET_MULTI_SEARCH_MOVIE_PAGE,
    SET_MULTI_SEARCH_RESULTS,SET_MULTI_SEARCH_PEOPLE_PAGE,SET_MULTI_SEARCH_TV_PAGE,
    APPEND_TO_PEOPLE_MULTI_SEARCH_RESULTS,APPEND_TO_MOVIE_MULTI_SEARCH_RESULTS,APPEND_TO_TV_MULTI_SEARCH_RESULTS,
    CLEAR_MULTI_SEARCH_RESULTS
} from "./actionTypes";

export const toggleGenreFilter = (genre) => ({
    type: TOGGLE_GENRE_FILTER,
    payload: genre
});

export const toggleRatingFilter = (rating) => ({
    type: TOGGLE_RATING_FILTER,
    payload: rating
});

export const setReleaseYears = (startYear, endYear) => ({
    type: SET_RELEASE_YEARS,
    payload: { startYear, endYear }
});

export const setAudienceScore = (score) => ({
    type: SET_AUDIENCE_SCORE,
    payload: score
});

export const setSearchResults = (results) => ({
    type: SET_SEARCH_RESULTS,
    payload: results,
});

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS,
});

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    payload: currentPage,
});

export const setMaxPage = (maxPage) => ({
    type: SET_MAX_PAGE,
    payload: maxPage,
});
export const appendToResults = (currentPage,pageData) => ({
    type: APPEND_TO_RESULTS,
    payload: {
        page: currentPage,  // Include the page number
        data: pageData,
    },
});

export const setSearchUrl = (url) => ({
    type: SET_SEARCH_URL,
    payload: url,
})
// actions for Multi Search
export const clearMultiSearchResults = () => ({
    type: CLEAR_MULTI_SEARCH_RESULTS,
})
export const setMultiSearchResults = (data) => ({
    type: SET_MULTI_SEARCH_RESULTS,
    payload: data
})
export const setMultiSearchMoviePage = (page) => ({
    type: SET_MULTI_SEARCH_MOVIE_PAGE,
    payload: page,
})
export const setMultiSearchTVPage = (page) => ({
    type: SET_MULTI_SEARCH_TV_PAGE,
    payload: page,
})
export const setMultiSearchPeoplePage = (page) => ({
    type: SET_MULTI_SEARCH_PEOPLE_PAGE,
    payload: page,
})
export const appendToMovieMultiSearchResults = (movieData) => ({
    type: APPEND_TO_MOVIE_MULTI_SEARCH_RESULTS,
    payload: movieData,
})
export const appendToTVMultiSearchResults = (tvData) => ({
    type: APPEND_TO_TV_MULTI_SEARCH_RESULTS,
    payload: tvData,
})
export const appendToPeopleMultiSearchResults = (peopleData) => ({
    type: APPEND_TO_PEOPLE_MULTI_SEARCH_RESULTS,
    payload: peopleData,
})

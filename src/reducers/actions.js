// actions.js
import {
    TOGGLE_GENRE_FILTER, TOGGLE_RATING_FILTER, SET_RELEASE_YEARS,
    SET_AUDIENCE_SCORE, SET_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS,
    SET_MAX_PAGE, SET_CURRENT_PAGE, SET_SEARCH_URL, APPEND_TO_RESULTS
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
export const appendToResults = (dataToAppend) => ({
    type: APPEND_TO_RESULTS,
    payload: dataToAppend,
});

export const setSearchUrl = (url) => ({
    type: SET_SEARCH_URL,
    payload: url,
})
// actions.js
import {TOGGLE_GENRE_FILTER, TOGGLE_RATING_FILTER, SET_RELEASE_YEARS,SET_AUDIENCE_SCORE} from "./actionTypes";

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
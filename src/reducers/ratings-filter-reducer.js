// ratingsReducer.js
import { TOGGLE_RATING_FILTER } from './actionTypes';

// Define your list of ratings
const ratings = ['R', 'PG', 'PG-13', 'G', 'NC-17'];

// Create an initial state mapping each rating to `false`
const initialState = ratings.reduce((acc, rating) => {
    acc[rating] = false;
    return acc;
}, {});

const ratingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_RATING_FILTER:
            return {
                ...state,
                [action.payload]: !state[action.payload] // Toggle the selected rating
            };
        default:
            return state;
    }
};
export default ratingsReducer;

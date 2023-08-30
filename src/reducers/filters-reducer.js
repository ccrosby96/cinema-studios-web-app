// filtersReducer.js
import { TOGGLE_GENRE_FILTER } from './actionTypes';

// Define your list of genres
const genres = ['Horror', 'Comedy', 'Action', 'Thriller','Crime',
        'Documentary', 'Drama','Family','Fantasy','History','Music','Mystery','Romance','Scify','War','Western'];

// Create an initial state mapping each genre to `false`
const initialState = genres.reduce((acc, genre) => {
    acc[genre] = false;
    return acc;
}, {});

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_GENRE_FILTER:
            return {
                ...state,
                [action.payload]: !state[action.payload] // Toggle the selected genre
            };
        default:
            return state;
    }
};
export default filtersReducer;

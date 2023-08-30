// releaseYearsReducer.js
import { SET_RELEASE_YEARS } from './actionTypes';

const initialState = {
    startYear: "",
    endYear: ""
};

const releaseYearsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RELEASE_YEARS:
            return {
                ...state,
                startYear: action.payload.startYear,
                endYear: action.payload.endYear
            };
        default:
            return state;
    }
};

export default releaseYearsReducer;

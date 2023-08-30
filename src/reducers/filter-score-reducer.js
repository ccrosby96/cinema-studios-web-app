// audienceScoreReducer.js
import { SET_AUDIENCE_SCORE } from './actionTypes';

const initialState = 50; // Initial audience score

const audienceScoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUDIENCE_SCORE:
            return action.payload;
        default:
            return state;
    }
};

export default audienceScoreReducer;
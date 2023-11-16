import {setSearchResults} from "../thunks/ai-thunks";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    results: {}, // simple array to cache the results the AI comes up with (received from backend req to movie details endpoint)
    loading: false, // Add loading state
    error: null, // Add error state
};
const aiSearchResultsSlice = createSlice({
    name: 'aiSearchResults',
    initialState,
    reducers: [], // Add other reducers if needed
    extraReducers: {
            [setSearchResults.pending]: (state, action) => {
                state.loading = true
            },
            [setSearchResults.fulfilled]: (state, { payload }) => {
                state.loading = false
                state.results = payload
            },
            [setSearchResults.rejected]: (state, action) => {
                state.loading = false
                state.error = action.error
            }
        }
    }
);
export default aiSearchResultsSlice.reducer;

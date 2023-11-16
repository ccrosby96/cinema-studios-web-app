import {createAsyncThunk} from "@reduxjs/toolkit"
import * as service from "../services/movie-service.js"

export const setSearchResults = createAsyncThunk(
    'aiSearchResults/setSearchResults', // action type
    async (message) => {
        const results = await service.fetchMovieDetailsFromSuggestions(message);
        return results.resultDict;
    }
);
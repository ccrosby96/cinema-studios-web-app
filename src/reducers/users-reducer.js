import { createSlice } from "@reduxjs/toolkit";

import { findUserThunk, updateUserThunk, deleteUserThunk,
    createUserThunk, findAllUsersThunk, loginThunk, profileThunk, logoutThunk, addMovieFavoriteThunk } from
        "../thunks/users-thunks";

const initialState = {
    user: [],
    currentUser: null,
    loading: false
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: [],
    extraReducers: {
        [findUserThunk.pending]: (state, action) => {
            state.loading = true
        },
        [findUserThunk.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload
        },
        [findUserThunk.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error
        },
        [findAllUsersThunk.pending]: (state, action) => {
            state.loading = true
        },
        [findAllUsersThunk.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload
        },
        [findAllUsersThunk.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error
        },

        [updateUserThunk.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = {
                ...state.user,
                ...payload
            }
        },

        [createUserThunk.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload
        },

        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload
        },

        [loginThunk.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error
        },

        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;
        },

        [profileThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },

        [deleteUserThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.user = state.user.filter(user => user._id !== payload._id)
            },
        [addMovieFavoriteThunk.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                currentUser: {
                    ...state.currentUser,
                    favoriteMovies: [...state.currentUser.favoriteMovies, payload],
                },
            };
        },


    }
})

export default usersSlice.reducer


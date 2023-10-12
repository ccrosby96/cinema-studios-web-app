import {createAsyncThunk} from "@reduxjs/toolkit"
import * as service from "../services/users-service"


export const findUserThunk = createAsyncThunk(
    "users/findUser", async (handle) => {
        const user =  await service.getUser(handle)
        return user
    }
)

export const findAllUsersThunk = createAsyncThunk(
    "users/findAllUsers", async () => {
        return await service.getAllUsers()
    }
)


export const updateUserThunk = createAsyncThunk(
    "users/updateUser", async (user) => {
        console.log('user data in updateUserThunk', user);
        return await service.updateUser(user)
    }
)

export const createUserThunk = createAsyncThunk(
    "users/createUser", async (user) => {
        return await service.createUser(user)
    }
)

export const deleteUserThunk = createAsyncThunk(
    "users/deleteUser", async (user) => {
        return await service.deleteUser(user)
    }
)

export const loginThunk = createAsyncThunk(
    "users/login", async (credentials) => {
        const user =  await service.login(credentials)
        return user;
    }
)
export const addMovieFavoriteThunk = createAsyncThunk(
    "users/favorites", async (movie) => {
        const result = await service.addToUserFavorites(movie)
        console.log("return result in favoriteThunk", result);
        return result;
    }
)

export const profileThunk = createAsyncThunk(
    "users/profile", async () => {
        return await service.profile();
    });


export const logoutThunk = createAsyncThunk(
    "users/logout", async () => {
        return await service.logout();
    });





import React, { useState } from "react";
import WatchListItem from "./watch-list-item";
import {useDispatch, useSelector} from "react-redux";
import {deleteFromUserWatchList} from "../../services/users-service";

import {updateUserThunk} from "../../thunks/users-thunks"

function MovieWatchList({ movies, profile }) {
    // Create state to store the movies to be displayed
    const [displayedMovies, setDisplayedMovies] = useState(movies);
    console.log('profile in movieWatchList', profile);


    console.log('watchlist: ',movies)
    const dispatch = useDispatch();
    // Function to remove a movie from the displayed list
    const removeMovie =  async (movieId) => {
        try {
            // Call the API function
            //const result = await deleteFromUserWatchList(movieId);
            const updatedMovies = displayedMovies.filter((movie) => movie.movieId !== movieId);
            // in the user document we want to update the watchlist array to the filtered watchlist above
            await setDisplayedMovies(updatedMovies);
            const newProfile = {
                ...profile,
                watchlist: updatedMovies,
            };
            console.log('calling updateUserThunk with updated watchlist:', {watchlist: updatedMovies});
            dispatch(updateUserThunk(newProfile));

            // If successful, you can optionally display a success message or update your UI
            // ...
        } catch (error) {
            // Handle the error here
            console.error(error)
        }
    };

    return (
        <>
            <ul className="list-group no-bullets">
                {displayedMovies.map((movie, i) => (
                    <WatchListItem key={i} movie={movie} onRemove={removeMovie} />
                ))}
            </ul>
        </>
    );
}

export default MovieWatchList;

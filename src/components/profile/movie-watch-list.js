import React, { useState } from "react";
import WatchListItem from "./watch-list-item";
import {useDispatch, useSelector} from "react-redux";
import {deleteFromUserWatchList} from "../../services/users-service";

import {updateUserThunk} from "../../thunks/users-thunks"

function MovieWatchList({ movies, profile, username, loggedInUser}) {
    // Sorting documents based on _id
    const movieArray = movies.slice().sort((a, b) => b._id - a._id);
    // Create state to store the movies to be displayed
    const [displayedMovies, setDisplayedMovies] = useState(movieArray);
    console.log('profile in movieWatchList', profile);
    console.log('logged in user in movieWatchList', loggedInUser);

    console.log('watchlist: ',movies)
    const dispatch = useDispatch();
    // Function to remove a movie from the displayed list
    // Assuming your array of documents is named 'documents'


// Now, sortedDocuments contains the array sorted based on the _id field.

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
            console.log("userId:", profile._id);
            console.log("newProfile:", newProfile);

            dispatch(updateUserThunk(newProfile));
        } catch (error) {
            // Handle the error here
            console.error(error)
        }
    };

    return (
        <>
            <ul className="list-group no-bullets bg-dark">
                {displayedMovies.map((movie, i) => (
                    <WatchListItem key={i} movie={movie} onRemove={removeMovie} profile = {profile} username = {username} loggedInUser = {loggedInUser} />
                ))}
            </ul>
        </>
    );
}

export default MovieWatchList;

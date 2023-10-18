import FavoriteItem from "./favorite-item";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {profileThunk, updateUserThunk} from "../../thunks/users-thunks";
import {useDispatch, useSelector} from "react-redux";
import {checkForFollowRelationship, getBaseProfileByUsername} from "../../services/users-service";
import {getReviewsByUserId} from "../../services/movie-review-service";
function FavoritesScrollBar ({favorites, profile, currentUser}) {
    const [displayedFavorites, setDisplayedFavorites] = useState(favorites);
    const dispatch = useDispatch();
    console.log("currentUser in favorites Scroll", currentUser);

    useEffect(() => {
            setDisplayedFavorites(favorites)
    }, [favorites]);


    const removeFavorite =  async (movieId) => {
        try {
            // Call the API function
            //const result = await deleteFromUserWatchList(movieId);
            const updatedFavorites = displayedFavorites.filter((movie) => movie.movieId !== movieId);
            // in the user document we want to update the watchlist array to the filtered watchlist above
            await setDisplayedFavorites(updatedFavorites);
            console.log("set displayed movies", displayedFavorites);
            const update = {
                    _id: currentUser._id,
                    favoriteMovies: updatedFavorites
                };

            console.log("calling updateUserThunk with updated favorites", update)
            dispatch(updateUserThunk(update))

            // If successful, you can optionally display a success message or update your UI
            // ...
        } catch (error) {
            // Handle the error here
            console.error(error)
        }
    };

    if (favorites === null ||favorites.length === 0) {
        return (<></>);
    }
    return (
        <>
            <div className="scroll_media-scroller snaps-inline bg-dark rounded-3 mb-2">
                {
                    displayedFavorites.map((movie, i) => {
                        return (
                                <FavoriteItem movie={movie} profile={profile} currentUser={currentUser} onRemove={removeFavorite}/>
                        )
                    })
                }
            </div>
        </>
    )
}
export default FavoritesScrollBar;
import FavoriteItem from "./favorite-item";
import {Link} from "react-router-dom";
import {useState} from "react";
import {updateUserThunk} from "../../thunks/users-thunks";
function FavoritesScrollBar ({favorites}) {
    const [displayedFavorites, setDisplayedFavorites] = useState(favorites);

    const removeFavorite =  async (movieId) => {
        try {
            // Call the API function
            //const result = await deleteFromUserWatchList(movieId);
            const updatedFavorites = displayedFavorites.filter((movie) => movie.movieId !== movieId);
            // in the user document we want to update the watchlist array to the filtered watchlist above
            await setDisplayedFavorites(updatedFavorites);
            console.log("set displayed movies", displayedFavorites);


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
            <div className="scroll_media-scroller snaps-inline bg-dark rounded-3">
                {
                    displayedFavorites.map((movie, i) => {
                        return (
                                <FavoriteItem movie={movie} onRemove={removeFavorite}/>
                        )
                    })
                }
            </div>
        </>
    )
}
export default FavoritesScrollBar;


import style from "../../styles/card-hover.css"
import {Link} from "react-router-dom";
function FavoriteItem({movie, onRemove,profile,currentUser}) {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = movie.posterPic
        ? url +  movie.posterPic
        : "https://media.istockphoto.com/id/1039351052/vector/movie-and-film-festival-poster-template-design-modern-retro-vintage-style.jpg?s=612x612&w=0&k=20&c=aPVSLX7VlJj7DYBZ8afyj9ca15qoZEeZkLj_1exaUfE="
    const title = movie.movieTitle;

    const handleRemoveClick = () => {
        // Call the onRemove prop to remove the movie by its ID
        onRemove(movie.movieId);
    };

    return (

        <div className="bg-black bg-opacity-50 rounded-3 border-secondary border-1  m-0 p-0 mb-0 pb-0">
            {profile && currentUser && profile.username === currentUser.username &&
                (<i className="btn fa-solid fa-x float-end m-0 p-1"
               style = {{color: "white"}}
               onClick = {handleRemoveClick}></i>)
            }
            <Link to = {`/movies/movie/${movie.movieId}`} className = "text-decoration-none pb-0 mb-0">
                <img
                    src= {poster_path}
                    alt="Not Found"
                    className = "rounded-bottom-3 img-fluid p-0 pb-0 mb-0"
                    style={{ width: "100%", height: "90%" }}/>
            </Link>

        </div>
    );
}

export default FavoriteItem;



import style from "../../styles/card-hover.css"
import {Link} from "react-router-dom";
function MovieRecTile({movie, onRemove}) {
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

        <div className="bg-dark rounded-3 border-secondary border-1">
            <i className="btn fa-solid fa-x float-end m-0 p-1"
               style = {{color: "white"}}
                onClick = {handleRemoveClick}></i>
            <Link to = {`/movies/movie/${movie.movieId}`} className = "text-decoration-none pb-0 mb-0">
                <img
                    src= {poster_path}
                    alt="Not Found"
                    className = "rounded-3 img-fluid p-1 pb-0 mb-0"/>
            </Link>
            <div className = " ps-1 m-0 rounded-bottom-3">
                <span className="title a1-font-16px mb-0 pb-0 mt-0 pt-0 white-font">{title}</span>
            </div>
        </div>
    );
}

export default MovieRecTile;

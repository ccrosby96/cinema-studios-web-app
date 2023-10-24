import MovieListItem from "./movie-list-item";
import {Link} from "react-router-dom";
import MovieRecTile from "../recommendations/movie_rec_tile";
function MovieResultsList (movies = movies = [
    {
        "adult": false,
        "backdrop_path": "/hiHGRbyTcbZoLsYYkO4QiCLYe34.jpg",
        "id": 758323,
        "title": "The Pope's Exorcist",
        "original_language": "en",
        "original_title": "The Pope's Exorcist",
        "overview": "Father Gabriele Amorth, Chief Exorcist of the Vatican, investigates a young boy's terrifying possession and ends up uncovering a centuries-old conspiracy the Vatican has desperately tried to keep hidden.",
        "poster_path": "/gNPqcv1tAifbN7PRNgqpzY8sEJZ.jpg",
        "media_type": "movie",
        "genre_ids": [
            27,
            53
        ],
        "popularity": 600.969,
        "release_date": "2023-04-05",
        "video": false,
        "vote_average": 7.217,
        "vote_count": 1567
    },
    {
        "adult": false,
        "backdrop_path": "/sPIh2OcF7uhSLYH43W9UyQ4vEt4.jpg",
        "id": 726239,
        "title": "Dead",
        "original_language": "en",
        "original_title": "Dead",
        "overview": "Dane ‘Marbles’ Marbeck can see ghosts, thanks to a homemade drug: his late father’s neurological medication mixed with marijuana.  Officer Jayson Tagg, a wannabe super-cop on the trail of a serial killer, ends up murdered.  So when Marbles’ mum plans to sell the family farm, and the only way of buying the house off her is taking the money offered by Tagg in exchange for his help, Marbles accepts.  The unlikely duo of stoner medium and ghost cop struggle to reconcile their differences while they navigate their way through ghouls, perverts, a mysterious hooded figure, and an unexpected shot at love.  It becomes clear the only way Marbles and Tagg will solve the case with their souls intact is to confront their deepest regrets and overcome their prejudices.",
        "poster_path": "/eu40V59ULl92GIWfRGLAuzu5EYb.jpg",
        "media_type": "movie",
        "genre_ids": [
            35,
            27,
            9648
        ],
        "popularity": 4.278,
        "release_date": "2020-10-22",
        "video": false,
        "vote_average": 5.8,
        "vote_count": 39
    }]) {
    if (movies.movies.length === 0){
        return (<p className = "white-font"> No movies found (ㆆ _ ㆆ)</p>)
    }

    return (
        <>
            <ul className= "list-group no-bullets">
                {
                    movies.movies.map((movie, i) => {

                        return (
                                    <MovieListItem movie={movie}/>

                        )
                    })
                }
            </ul>

        </>
    );

}
export default MovieResultsList;
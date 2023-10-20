import style from "../../styles/card-hover.css"
function MovieRecTile(
    movie =  {
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
    }
) {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = movie.movie.poster_path
        ? url +  movie.movie.poster_path
        : "https://media.istockphoto.com/id/1039351052/vector/movie-and-film-festival-poster-template-design-modern-retro-vintage-style.jpg?s=612x612&w=0&k=20&c=aPVSLX7VlJj7DYBZ8afyj9ca15qoZEeZkLj_1exaUfE="
    const title = movie.movie.title;
    const vote_average = isNaN(movie.movie.vote_average) ? '' : movie.movie.vote_average.toPrecision(2);

    //console.log("In actor card, headshot_url is ", poster_path);

    return (

        <div className="hover-card-container">
            <img
                src= {poster_path}
                alt="Not Found"
                className = "rounded-3 img-fluid"/>
            <div className = " p-2 m-0 rounded-bottom-3">
                <span className="card-text a1-font-16px mt-1 pt-0 white-font">{vote_average}</span>
                <i className="fa-solid fa-star color-yellow ms-2 "></i>
                <br/>
                <span className="title a1-font-16px mb-0 pb-0 white-font">{title}</span>

            </div>

        </div>


    );
}

export default MovieRecTile;

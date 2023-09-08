
function MovieListItem (movie = {
    "adult": false,
    "backdrop_path": "/xgU3KkqiME9pGe5gGCNpUYkoSWg.jpg",
    "id": 578,
    "title": "Jaws",
    "original_language": "en",
    "original_title": "Jaws",
    "overview": "When an insatiable great white shark terrorizes the townspeople of Amity Island, the police chief, an oceanographer and a grizzled shark hunter seek to destroy the blood-thirsty beast.",
    "poster_path": "/lxM6kqilAdpdhqUl2biYp5frUxE.jpg",
    "media_type": "movie",
    "genre_ids": [
        27,
        53,
        12
    ],
    "popularity": 49.61,
    "release_date": "1975-06-20",
    "video": false,
    "vote_average": 7.658,
    "vote_count": 9480
    }) {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = url + movie.movie.poster_path;
    const title = movie.movie.title;
    const overview = movie.movie.overview;

    return (
    <div className ="list-group-item m-1">
        <div className="row">
            <div className="col-4">
                <img className="card-img rounded-3 movie-list-item-img m-0 p-0" src= {poster_path} alt="Image Not Found"/>
            </div>
            <div className="col-8 m-0 p-0">
                <div className="m-0 p-0">
                    <h5 className="">{title}</h5>
                    <p className="">{overview}</p>

                </div>
            </div>
        </div>
    </div>
    )

}
export default MovieListItem
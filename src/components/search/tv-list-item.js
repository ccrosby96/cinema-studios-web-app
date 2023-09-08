
function TVListItem (show = {
    "adult": false,
    "backdrop_path": "/vlG182ZY2WMzD5bjFZNnhyvv5V4.jpg",
    "id": 40008,
    "name": "Hannibal",
    "original_language": "en",
    "original_name": "Hannibal",
    "overview": "Both a gift and a curse, Graham has the extraordinary ability to think like his prey—he sees what they see, feels what they feel. But while Graham is pursuing an especially troubling, cannibalistic murderer, Special Agent Jack Crawford teams him with a highly respected psychiatrist – a man with a taste for the criminal minded – Dr. Hannibal Lecter.",
    "poster_path": "/pbV2eLnKSIm1epSZt473UYfqaeZ.jpg",
    "media_type": "tv",
    "genre_ids": [
        18,
        80
    ],
    "popularity": 65.701,
    "first_air_date": "2013-04-04",
    "vote_average": 8.225,
    "vote_count": 2098,
    "origin_country": [
        "US"
    ]
}) {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = url + show.show.poster_path;
    const title = show.show.name;
    const overview = show.show.overview;

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
export default TVListItem
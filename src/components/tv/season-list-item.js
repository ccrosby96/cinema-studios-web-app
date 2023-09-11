import {useParams} from "react-router";

function SeasonListItem (season = {
    "air_date": "2013-04-04",
    "episode_count": 13,
    "id": 51121,
    "name": "Season 1",
    "overview": "After a particularly grueling case hunting a serial killer known as the Minnesota Shrike, Will Graham threatens to walk away. Jack Crawford, the head of the FBI's Behavioral Science Unit, desperately needs Will on his team to break the tough cases, so he enlists Dr. Hannibal Lecter, to ensure Will's mental well-being. Unbeknownst to Will, Hannibal also has a particular insight into these horrible crimes and the psychopaths who commit them. As Will hunts down brutal killers, he is unknowingly sitting across from the most gifted killer of them all.",
    "poster_path": "/9aCWg7kU0865IPJmv8ui1kEQBNX.jpg",
    "season_number": 1,
    "vote_average": 7.9
}) {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = url + season.season.poster_path;
    const title = season.season.name;
    const overview = season.season.overview;
    const episodeCount = season.season.episode_count;
    const seasonId = season.season.id;
    const voteAverage = season.season.vote_average;
    const params = useParams();
    console.log("SeasonListItem params, ", params)

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
export default SeasonListItem
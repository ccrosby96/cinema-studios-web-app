
function SeasonScrollTile(
    season = {
        "air_date": "2013-04-04",
        "episode_count": 13,
        "id": 51121,
        "name": "Season 1",
        "overview": "After a particularly grueling case hunting a serial killer known as the Minnesota Shrike, Will Graham threatens to walk away. Jack Crawford, the head of the FBI's Behavioral Science Unit, desperately needs Will on his team to break the tough cases, so he enlists Dr. Hannibal Lecter, to ensure Will's mental well-being. Unbeknownst to Will, Hannibal also has a particular insight into these horrible crimes and the psychopaths who commit them. As Will hunts down brutal killers, he is unknowingly sitting across from the most gifted killer of them all.",
        "poster_path": "/9aCWg7kU0865IPJmv8ui1kEQBNX.jpg",
        "season_number": 1,
        "vote_average": 7.9
    }
) {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = url + season.season.poster_path;
    const title = season.season.name;
    const vote_average = season.season.vote_average;
    const percent = (vote_average / 10 * 100).toPrecision(2);
    const episodeCount = season.season.episode_count;

    if (season.season.season_number === 0){
        return <></>
    }

    return (

        <div className="scroll_media-element">
            <img
                src= {poster_path}
                alt="Not Found"/>
            <span className="title a1-font-16px mb-0 pb-0 white-font">{title}</span>
            <span className="card-text a1-font-16px mt-1 pt-0 white-font float-end">{percent}%&nbsp;&nbsp;{episodeCount} Episodes </span>
        </div>


    );
}

export default SeasonScrollTile;

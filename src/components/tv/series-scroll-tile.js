
function SeriesScrollTile(
    series = {
        "adult": false,
        "backdrop_path": "/wxvnnh8rS9ge8296HUpj9BiwM6B.jpg",
        "id": 2085,
        "name": "Courage the Cowardly Dog",
        "original_language": "en",
        "original_name": "Courage the Cowardly Dog",
        "overview": "The bizarre misadventures of a cowardly dog named Courage and his elderly owners in a farmhouse in Nowhere, Kansas.",
        "poster_path": "/dzD8EWDvtg7rBCINu0RCH5EUejh.jpg",
        "media_type": "tv",
        "genre_ids": [
            10751,
            10765,
            16,
            35
        ],
        "popularity": 311.142,
        "first_air_date": "1999-11-12",
        "vote_average": 8.165,
        "vote_count": 1330,
        "origin_country": [
            "US"
        ]
    }
) {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = url + series.series.poster_path;
    const title = series.series.name;
    const vote_average = series.series.vote_average;
    const percent = (vote_average / 10 * 100).toPrecision(2);

    return (

        <div className="scroll_media-element">
            <img
                src= {poster_path}
                alt="Not Found"
                className = "series-recs-tile-image"/>
            <span className="title a1-font-16px mb-0 pb-0 white-font">{title}</span>
            <span className="card-text a1-font-16px mt-1 pt-0 white-font float-end">{percent}%&nbsp;&nbsp;</span>
        </div>


    );
}

export default SeriesScrollTile;

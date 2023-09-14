import {Link} from "react-router-dom";
import SeriesScrollTile from "./series-scroll-tile";
function TvRecommendationsScrollBar(
    recs = [
        {
            "adult": false,
            "backdrop_path": "/1lJ0Bb5JWThXkJMRe85BOyMpjKu.jpg",
            "id": 1068,
            "name": "The New Scooby-Doo Movies",
            "original_language": "en",
            "original_name": "The New Scooby-Doo Movies",
            "overview": "Aside from doubling the length of each episode, The New Scooby-Doo Movies differed from its predecessor in the addition of a rotating special guest star slot; each episode featured real-life celebrities or well known fictional characters joining the Mystery, Inc. gang in solving the mystery of the week. Some episodes, in particular the episodes guest-starring the characters from The Addams Family, Batman, and Jeannie, deviated from the established Scooby-Doo format of presenting criminals masquerading as supernatural beings by introducing real ghosts, witches, monsters, and other such characters into the plots.",
            "poster_path": "/slBx9Vkh0ET9m2lgrD8KxJDL5T9.jpg",
            "media_type": "tv",
            "genre_ids": [
                16,
                9648,
                35,
                10762,
                10751
            ],
            "popularity": 29.608,
            "first_air_date": "1972-09-09",
            "vote_average": 7.667,
            "vote_count": 233,
            "origin_country": [
                "US"
            ]
        },
        {
            "adult": false,
            "backdrop_path": "/azYkdfJEkhn94jozR87t46LeCst.jpg",
            "id": 652,
            "name": "What's New, Scooby-Doo?",
            "original_language": "en",
            "original_name": "What's New, Scooby-Doo?",
            "overview": "Scooby-Doo and the Mystery, Inc. gang are launched into the 21st century, with new mysteries to solve.",
            "poster_path": "/7sX80eWq4XHvFGUmCg803iifUcG.jpg",
            "media_type": "tv",
            "genre_ids": [
                16,
                10759,
                9648
            ],
            "popularity": 207.896,
            "first_air_date": "2002-09-14",
            "vote_average": 7.891,
            "vote_count": 565,
            "origin_country": [
                "US"
            ]
        },
        {
            "adult": false,
            "backdrop_path": "/8ue1wppL1W9jiJMwUXj9T4ilnCe.jpg",
            "id": 1069,
            "name": "The 13 Ghosts of Scooby-Doo",
            "original_language": "en",
            "original_name": "The 13 Ghosts of Scooby-Doo",
            "overview": "Shaggy and Scooby-Doo and friends must return 13 ghosts which they inadvertently released to a magical chest. Together with Daphne and Scrappy-Doo, along with  newcomer Flim-Flam, they travel the world facing the ghosts that must be returned to the chest.",
            "poster_path": "/v7S15heYWQSJLM60uZjim7Y9nzG.jpg",
            "media_type": "tv",
            "genre_ids": [
                16,
                9648,
                35,
                10751
            ],
            "popularity": 37.57,
            "first_air_date": "1985-09-07",
            "vote_average": 7.986,
            "vote_count": 185,
            "origin_country": [
                "US"
            ]
        }]

) {

   // console.log("recs in TvRecomendationScrollbar_component",recs);
    return (
        <>
            <div className="scroll_media-scroller snaps-inline">
                {
                    recs.recs.map((series, i) => {

                        return (
                            <Link to = {`/tv/series/${series.id}`} className = "text-decoration-none">
                                <SeriesScrollTile series={series}/>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    );
}
export default TvRecommendationsScrollBar;

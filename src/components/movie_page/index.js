import NavigationSidebar from "../navigation";
import MovieBox from "../movie_box";
import movie from "./movie.json";
import ActorCard from "../actor_card";
import credits from "../actor_card/credits.json"
import recommendations from "../recommendations/recommendations.json";
import providers from "../watch_providers/providers.json"
import {grabGenres,grabRuntime, grabOriginalLanguage} from "../../helper_functions/helper_functions";
import CastScrollBar from "../actor_scroll_bar";
import WatchProviders from "../watch_providers";
import RecommendationsScrollBar from "../recommendations";


/*
cinema studios - name idea by jake fredo
 */
function MoviePage(

    movie = {
        "adult": false,
        "backdrop_path": "/sFGENDTUNOuDbVufxksCkrDtuaT.jpg",
        "belongs_to_collection": null,
        "budget": 15000000,
        "genres": [
            {
                "id": 53,
                "name": "Thriller"
            },
            {
                "id": 27,
                "name": "Horror"
            }
        ],
        "homepage": "https://www.evildeadrisemovie.com",
        "id": 713704,
        "imdb_id": "tt13345606",
        "original_language": "en",
        "original_title": "Evil Dead Rise",
        "overview": "A reunion between two estranged sisters gets cut short by the rise of flesh-possessing demons, thrusting them into a primal battle for survival as they face the most nightmarish version of family imaginable.",
        "popularity": 652.882,
        "poster_path": "/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
        "production_companies": [
            {
                "id": 12,
                "logo_path": "/5ThIuO93vsk47oexKTSdfKEr7EC.png",
                "name": "New Line Cinema",
                "origin_country": "US"
            },
            {
                "id": 768,
                "logo_path": null,
                "name": "Ghost House Pictures",
                "origin_country": "US"
            },
            {
                "id": 467,
                "logo_path": null,
                "name": "Renaissance Pictures",
                "origin_country": "US"
            },
            {
                "id": 7893,
                "logo_path": null,
                "name": "Pacific Renaissance Pictures",
                "origin_country": "NZ"
            },
            {
                "id": 129815,
                "logo_path": "/qbCmnVTQEuFqrVkbxn3i9P7Jrcw.png",
                "name": "Wild Atlantic Pictures",
                "origin_country": "IE"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "IE",
                "name": "Ireland"
            },
            {
                "iso_3166_1": "NZ",
                "name": "New Zealand"
            },
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "release_date": "2023-04-12",
        "revenue": 141512122,
        "runtime": 96,
        "spoken_languages": [
            {
                "english_name": "Hungarian",
                "iso_639_1": "hu",
                "name": "Magyar"
            },
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            }
        ],
        "status": "Released",
        "tagline": "Mommy loves you to death.",
        "title": "Evil Dead Rise",
        "video": false,
        "vote_average": 7.032,
        "vote_count": 1785
    }
) {
    const url = "http://image.tmdb.org/t/p/w500";
    let poster_url = url + movie.movie.poster_path;
    let backdrop_url = url + movie.movie.backdrop_path;
    const dateString = movie.movie.release_date;
    const date = new Date(dateString)
    const year = date.getFullYear().toString();
    let genres = grabGenres(movie.movie.genres)
    let runtime = grabRuntime(movie.movie.runtime)
    let tagline = movie.movie.tagline
    let actors = credits.cast;
    let recs = recommendations.results;
    console.log("recs in movie page component", recs)

    const provider_data = providers.results.US;




    return (
        <>
            <div className="row p-0 m-0">
                <NavigationSidebar/>
            </div>
                <div className="container">
                    <div className="row bg-color">
                        <div className="col-4">
                            <div className = "bg-image">
                                <img className="" src = {poster_url} width="70%" height = "70%" />

                            </div>

                        </div>
                        <div className= "col-8">
                            <span className="fw-bold a1-font-32px white-font"> {movie.movie.title}</span> <span className="a1-font-32px white-font"> ({year})</span>
                            <br></br>
                            <span  className= "fst-italic white-font"> {dateString}</span> . <span className= "white-font" > {genres}</span> .
                            <span class= "white-font"> {runtime}</span>

                            <br></br>
                            <br></br>

                            <p class = "fst-italic a1-font-16px white-font"> {tagline}</p>
                            <p class = "fw-bold a1-font-25px white-font"> Overview</p>
                            <span className= "white-font">{movie.movie.overview}</span>
                            <br></br>
                            <br></br>
                            <p className="fw-bold a1-font-16px white-font"> User Score </p>
                            <span className= "white-font">{movie.movie.vote_average} / 10</span>



                        </div>
                    </div>
                    <div className="row pt-1">
                        < div className= "col-8">
                            <span class = "a1-font-25px fw-bold"> Top Billed Cast</span>
                            <br></br>
                            <div>

                                {
                                    <CastScrollBar cast = {actors}/>
                                }

                            </div>






                        </div>

                        <div className= "col-4">
                            <ul className = "no-bullets mt-2">
                                <li>
                                    <span class= "fw-bold"> Status</span>
                                    <br></br>
                                    <p > {movie.movie.status}</p>
                                </li>
                                <li>
                                    <span className="fw-bold"> Original Language</span>
                                    <br></br>
                                    <p> {grabOriginalLanguage(movie)}</p>
                                </li>
                                <li>
                                    <span className="fw-bold">Budget</span>
                                    <br></br>
                                    <p> ${movie.movie.budget.toLocaleString()}</p>
                                </li>
                                <li>
                                    <span className="fw-bold"> Revenue</span>
                                    <br></br>
                                    <p> ${movie.movie.revenue.toLocaleString()}</p>
                                </li>
                            </ul>

                        </div>


                    </div>
                    <div className="row">
                        <div className = "col-8">
                            <span className="a1-font-25px fw-bold">Recommendations</span>
                            <RecommendationsScrollBar data = {recs}/>
                        </div>
                        <div className= "col-4">

                            <WatchProviders data = {provider_data}/>

                        </div>

                    </div>
                </div>



                <span></span>




        </>
    );
}

export default MoviePage;
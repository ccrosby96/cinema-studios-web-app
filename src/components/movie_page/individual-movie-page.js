import NavigationSidebar from "../navigation";
import MovieBox from "../movie_box";
import movie from "./movie.json";
import ActorCard from "../actor_card";
import credits from "../actor_card/credits.json"
import providers from "../watch_providers/providers.json"
import {grabGenres,grabRuntime, grabOriginalLanguage, extractOriginalLanguage} from "../../helper_functions/helper_functions";
import CastScrollBar from "../actor_scroll_bar";
import WatchProviders from "../watch_providers";
import RecommendationsScrollBar from "../recommendations";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {findMovieDetailsById, findMovieCastById, findMovieProvidersById, findMovieRecommendationsById} from "../../services/movie-service";
import ApiWatchProviders from "../watch_providers/api-providers";


/*
cinema studios - name idea by jake fredo
 */
function IndividualMoviePage  () {
    console.log("individual movie page called!")
    const url = "http://image.tmdb.org/t/p/w500";
    const mid = useParams();
    const movieId = mid.mid
    console.log("movieID", movieId)
    const [isLoading, setLoading] = useState(true);
    const [dataStatus,setDataStatus] = useState({
        details: false,
        cast: false,
        providers: false,
        recs: false

    })
    const handleSetStatus = (property) => {
        setDataStatus((prevStatus) => ({
            ...prevStatus,
            [property]: true
        }));
    };
    const [details, setDetails] = useState(null);
    const [cast, setCast] = useState(null);
    const [providers, setProviders] = useState(null);
    const [recs, setRecs] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {

                const details = findMovieDetailsById(movieId);
                const cast = findMovieCastById(movieId);
                const providers = findMovieProvidersById(movieId);
                const recommendations = findMovieRecommendationsById(movieId);
                const grabDetails = async () => {
                    const a = await details;
                    setDetails(a)
                    setLoading(false);
                    handleSetStatus('details')
                    console.log(a);
                };
                const grabCast = async () => {
                    const b = await cast;
                    setCast(b)
                    setLoading(false)
                    handleSetStatus('cast')
                    console.log('individual movie cast: ', b);
                }
                const grabProviders = async () => {
                    const c = await providers;
                    setProviders(c)
                    handleSetStatus('providers')
                    console.log('individual movie providers: ', c)

                }
                const grabRecs = async () => {
                    const d = await recommendations;
                    setRecs(d)
                    handleSetStatus('recs')
                    console.log('indiv recs', d)
                }
                grabDetails();
                grabCast();
                grabProviders();
                grabRecs();
                //const cast = findMovieCastById(mid.mid);
                //const providers = findMovieProvidersById(mid.mid);

                //setDetails(details);

                //setCast(cast);
                //setProviders(providers);
                console.log("logging details: ", details)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount

    console.log("individual movie details ", details)

    if (!dataStatus.details || !dataStatus.cast || !dataStatus.recs || !dataStatus.providers) {
        return <div className="App">Loading...</div>;
    }
    if (dataStatus.details && dataStatus.cast && dataStatus.recs &&  dataStatus.providers)
    return (
        <>
            <div className="row p-0 m-0">
                <NavigationSidebar/>
            </div>
            <div className="container">
                <div className="row bg-color">
                    <div className="col-4">
                        <div className="bg-image">
                            <img className="" src={url + details.poster_path} width="70%" height="70%"/>

                        </div>

                    </div>
                    <div className="col-8 bg-dark">
                        <span className="fw-bold a1-font-32px white-font"> {details.title}</span> <span
                        className="a1-font-32px white-font"> </span>
                        <br></br>
                        <span className="fst-italic white-font"> {details.release_date}</span> . <span
                        className="white-font"> ({(grabGenres(details.genres))})</span> .
                        <span className="white-font"> {grabRuntime(details.runtime)}</span>

                        <br></br>
                        <br></br>

                        <p className="fst-italic a1-font-16px white-font"> {details.tagline}</p>
                        <p className="fw-bold a1-font-25px white-font"> Overview</p>
                        <span className="white-font">{details.overview}</span>
                        <br></br>
                        <br></br>
                        <p className="fw-bold a1-font-16px white-font"> User Score </p>
                        <span className="white-font">{details.vote_average} / 10</span>


                    </div>
                </div>
                <div className="row pt-1">
                    < div className="col-8">
                        <span className="a1-font-25px fw-bold"> Top Billed Cast</span>
                        <br></br>
                        <div>

                            {
                                <CastScrollBar cast={cast.cast}/>
                            }
                        </div>
                    </div>
                    <div className="col-4">
                        <ul className="no-bullets mt-2">
                            <li>
                                <span className="fw-bold"> Status</span>
                                <br></br>
                                <p> {details.status}</p>
                            </li>
                            <li>
                                <span className="fw-bold"> Original Language</span>
                                <br></br>
                                <p> {extractOriginalLanguage(details)}</p>
                            </li>
                            <li>
                                <span className="fw-bold">Budget</span>
                                <br></br>
                                <p> ${details.budget.toLocaleString()}</p>
                            </li>
                            <li>
                                <span className="fw-bold"> Revenue</span>
                                <br></br>
                                <p> ${details.revenue.toLocaleString()}</p>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className="row">
                    <div className = "col-8">
                        <span className="a1-font-25px fw-bold">Recommendations</span>
                        <RecommendationsScrollBar data = {recs.results}/>
                    </div>
                    <div className= "col-4">

                        <ApiWatchProviders data = {providers.results.US}/>

                    </div>

                </div>

            </div>

        </>
    );
}

export default IndividualMoviePage;
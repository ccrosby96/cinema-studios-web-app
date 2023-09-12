import NavigationSidebar from "../navigation";
import '@fortawesome/fontawesome-free/css/all.css';
import providers from "../watch_providers/providers.json"
import {
    grabGenres,
    grabRuntime,
    grabOriginalLanguage,
    extractOriginalLanguage,
    generateTrailerUrl
} from "../../helper_functions/helper_functions";
import ApiCastScrollBar from "../actor_scroll_bar/api-cast-scroll-bar";
import RecommendationsScrollBar from "../recommendations";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {findMovieDetailsById, findMovieCastById, findMovieProvidersById,
    findMovieRecommendationsById, fetchMovieVideosById} from "../../services/movie-service";
import ApiWatchProviders from "../watch_providers/api-providers";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
/*
cinema studios - name idea by jake fredo
 */
function IndividualMoviePage  () {

    const url = "http://image.tmdb.org/t/p/w500";
    const mid = useParams();
    const movieId = mid.mid

    const [isLoading, setLoading] = useState(true);
    const [dataStatus,setDataStatus] = useState({
        details: false,
        cast: false,
        providers: false,
        recs: false,
        trailers: false

    })
    const handleSetStatus = (property) => {
        setDataStatus((prevStatus) => ({
            ...prevStatus,
            [property]: true
        }));
    };
    const openVideoInNewWindow = () => {
        if (trailers !== '') {
            window.open(trailers, '_blank', 'width=600,height=400'); // Adjust width and height as needed
        }
    };
    const [details, setDetails] = useState(null);
    const [cast, setCast] = useState(null);
    const [providers, setProviders] = useState(null);
    const [recs, setRecs] = useState(null);
    const [trailers, setTrailers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const details = findMovieDetailsById(movieId);
                const cast = findMovieCastById(movieId);
                const providers = findMovieProvidersById(movieId);
                const recommendations = findMovieRecommendationsById(movieId);
                const trailers = fetchMovieVideosById(movieId);
                const grabDetails = async () => {
                    const a = await details;
                    setDetails(a)
                    setLoading(false);
                    handleSetStatus('details')

                };
                const grabCast = async () => {
                    const b = await cast;
                    setCast(b)
                    setLoading(false)
                    handleSetStatus('cast')
                    //console.log('individual movie cast: ', b);
                }
                const grabProviders = async () => {
                    const c = await providers;
                    setProviders(c)
                    handleSetStatus('providers')
                    //console.log('individual movie providers: ', c)
                }
                const grabRecs = async () => {
                    const d = await recommendations;
                    setRecs(d)
                    handleSetStatus('recs')
                    //console.log('indiv recs', d)
                }
                const grabTrailers = async () => {
                    const t = await trailers;
                    const data = t.trailers;
                    console.log('trailer data', data);
                    const trailerUrl = generateTrailerUrl(data)
                    setTrailers(trailerUrl);
                    handleSetStatus('trailers')
                }
                grabDetails();
                grabCast();
                grabProviders();
                grabRecs();
                grabTrailers();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [movieId]); // if we have a new movie id we want to re-render


    console.log('movie trailer', trailers);

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
                        <div className = "trailer-icon float-right">
                            {trailers !== '' && (
                                <div onClick={openVideoInNewWindow}>
                                    <i className="fa-solid fa-play fa-2x trailer-icon" style={{color: "#f5f5f5"}}></i>
                                </div>
                            )}
                        </div>
                        <p className="fw-bold a1-font-25px white-font"> Overview</p>
                        <span className="white-font">{details.overview}</span>

                        <br></br>
                        <br></br>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa fa-search"></i>
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
                                <ApiCastScrollBar cast={cast.cast}/>
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
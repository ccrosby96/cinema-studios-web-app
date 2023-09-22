import NavigationSidebar from "../navigation";
import '@fortawesome/fontawesome-free/css/all.css';

import {convertScoreToPercent, formatDate, extractMovieCertification} from "../../helper_functions/helper_functions";
import {
    grabGenres,
    grabRuntime,
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
import ReviewPostForm from "../reviews/review-post-form";
import {useSelector} from "react-redux";
import {getReviewsByMovieId} from "../../services/movie-review-service";
import MovieReviewList from "../reviews/movie-review-list";

/*
cinema studios - name idea by jake fredo
 */
function IndividualMoviePage  () {

    const url = "http://image.tmdb.org/t/p/w500";
    const mid = useParams();
    const movieId = mid.mid
    const { currentUser } = useSelector((state) => state.user);
    console.log("user in moviepage is ", currentUser);

    const [dataStatus,setDataStatus] = useState({
        details: false,
        cast: false,
        providers: false,
        recs: false,
        trailers: false,
        reviews: false

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
    const [movieReviews, setMovieReviews] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const details = findMovieDetailsById(movieId);
                const cast = findMovieCastById(movieId);
                const providers = findMovieProvidersById(movieId);
                const recommendations = findMovieRecommendationsById(movieId);
                const trailers = fetchMovieVideosById(movieId);
                const reviews = getReviewsByMovieId(movieId);
                const grabDetails = async () => {
                    const a = await details;
                    setDetails(a)

                    handleSetStatus('details')

                };
                const grabReviews = async ()=> {
                    const r = await reviews;
                    setMovieReviews(r);
                    handleSetStatus('reviews');
                }
                const grabCast = async () => {
                    const b = await cast;
                    setCast(b)
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
                grabReviews();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [movieId]); // if we have a new movie id we want to re-render



    console.log(movieReviews);

    if (!dataStatus.details || !dataStatus.cast || !dataStatus.recs || !dataStatus.providers) {
        return <div className="App">Loading...</div>;
    }
    if (dataStatus.details && dataStatus.cast && dataStatus.recs &&  dataStatus.providers)
    return (
        <div className= "bg-color">
            <div className="row p-0 m-0">
                <NavigationSidebar/>
            </div>
            <div className="container">
                <div className="row bg-color">
                    <div className="col-3 bg-dark mt-1" >
                        <div className="bg-image bg-dark">
                            <img className="" src={url + details.poster_path} width="95%" height="95%" alt = ""/>

                        </div>

                    </div>
                    <div className="col-9 bg-dark mt-1">
                        <span className="fw-bold a1-font-32px white-font"> {details.title}</span> <span
                        className="a1-font-32px white-font"> </span>
                        <br></br>
                        <span className="fst-italic white-font"> {formatDate(details.release_date)}</span> . <span
                        className="white-font"> ({(grabGenres(details.genres))})</span> .
                        <span className="white-font"> {grabRuntime(details.runtime)}, </span>
                        <span className="white-font"> rated {extractMovieCertification(details)}</span>

                        <br></br>
                        <br></br>

                        <p className="fst-italic a1-font-16px white-font"> {details.tagline}</p>
                        <div className = "ms-0 ps-0 ">
                            {trailers !== '' && (
                                <button className = "bg-dark" onClick={openVideoInNewWindow}>
                                    <i className="fa-solid fa-play fa-2x trailer-icon" style={{color: "#f5f5f5"}}></i>
                                    <span className= "white-text nudge-up">  &nbsp; Play Trailer</span>

                                </button>
                            )}

                        </div>
                        <p className="fw-bold a1-font-25px white-font mb-0 pb-0 mt-2"> Overview</p>
                        <span className="white-font mt-0 pt-0">{details.overview}</span>

                        <br></br>
                        <br></br>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa fa-search"></i>
                        <p className="fw-bold a1-font-16px white-font mb-0 pb-0"> User Score </p>
                        <span className="white-font mt-0 pt-0">{convertScoreToPercent(details.vote_average)}%</span>





                    </div>
                </div>
                <div className="row pt-1">
                    < div className="col-9">
                        <span className="a1-font-25px fw-bold"> Top Billed Cast</span>
                        <br></br>
                        <div>

                            {
                                <ApiCastScrollBar cast={cast.cast}/>
                            }
                        </div>
                    </div>
                    <div className="col-3">
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
                <div className="row mb-0 pb-0">
                    <div className = "col-9">
                        <span className="a1-font-25px fw-bold">Recommendations</span>
                        <RecommendationsScrollBar data = {recs.results}/>


                    </div>
                    <div className= "col-3">

                        <ApiWatchProviders data = {providers.results.US}/>

                    </div>

                </div>
                <div className = "row mt-0 pt-0">
                    <span className="a1-font-25px fw-bold">Reviews</span>
                    <div className= "col-9">
                        {currentUser ? (
                            <ReviewPostForm user={currentUser} movieId={movieId} />
                        ) : (
                            <p>Please log in to post a review.</p>
                        )}
                        <MovieReviewList reviews = {movieReviews} movieId = {movieId}/>
                    </div>
                    <div className = "col-3">

                    </div>
                </div>

            </div>

        </div>
    );
}

export default IndividualMoviePage;
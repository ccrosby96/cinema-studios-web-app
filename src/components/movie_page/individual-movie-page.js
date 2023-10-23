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
import Directors from "../directors";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {findMovieDetailsById, findMovieProvidersById} from "../../services/movie-service";
import ApiWatchProviders from "../watch_providers/api-providers";
import ReviewPostForm from "../reviews/review-post-form";
import {useDispatch, useSelector} from "react-redux";
import {getReviewsByMovieId} from "../../services/movie-review-service";
import MovieReviewList from "../reviews/movie-review-list";
import {deleteFromUserFavorites, deleteFromUserWatchList} from "../../services/users-service";
import {addMovieFavoriteThunk, addMovieWatchlistThunk} from "../../thunks/users-thunks";

/*
cinema studios - name idea by jake fredo
 */
function IndividualMoviePage  () {

    const url = "http://image.tmdb.org/t/p/w500";
    const mid = useParams();
    const movieId = mid.mid
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [errorMessage, setErrorMessage] = useState(null);
    const [inWatchList, setInWatchList] = useState(false);
    const [inFavorites, setInFavorites] = useState(false);
    console.log("user in moviepage is ", currentUser);

    //const save = () => { dispatch(updateUserThunk(profile));};


    const [dataStatus,setDataStatus] = useState({
        details: false,
        providers: false,
        trailers: false,
        reviews: false

    })
    // save dispatches updates to user object, like movies added to watchlist

    const handleSetStatus = (property) => {
        setDataStatus((prevStatus) => ({
            ...prevStatus,
            [property]: true
        }));
    };
    const checkWatchList = () => {
        if (currentUser) {
            const isInWatchlist = currentUser.watchlist.some((item) => item.movieId === movieId);
            if (isInWatchlist){
                setInWatchList(true);
                console.log("movie in watchlist")
            }
            else {
                setInWatchList(false);
            }
        }
    }
    const checkFavorites = () => {
        if (currentUser) {
            const favorite = currentUser.favoriteMovies.some((item) => item.movieId === movieId);
            if (favorite){
                setInFavorites(true);
                console.log("movie in favorites");
                return
            }
            else {
                setInFavorites(false);
            }
        }
    }
    const favoritesClickHandler = async () => {
        if (!currentUser){
            setInFavorites(!inFavorites)
            return;
        }
        // if it's in favorites already then user wants to delete it
        if (inFavorites) {
            try {
                await deleteFromUserFavorites(movieId);
                setInFavorites(!inFavorites);
                return
            }catch (error){
            }
        }
        // create favoriteItem with details and dispatch action
        const favoriteItem = {
            movieTitle: details.title,
            movieId: movieId,
            posterPic: details.poster_path
        };
        try {
            // Call the API function
            //const result =await addToUserFavorites(favoriteItem);
            dispatch(addMovieFavoriteThunk(favoriteItem))
            setInFavorites(true);
            // If successful, you can optionally display a success message or update your UI
            // ...
        } catch (error) {
            // Handle the error here
            if (error.message === 'User not authenticated') {
                // Display an alert for the user to log in
                setErrorMessage('Please log in to add movies to your watchlist.');
            }
        }
    }
    const watchlistClickHandler = async () => {
        if (!currentUser){
            return;
        }
        if (inWatchList){
            try {
                await deleteFromUserWatchList(movieId);
                setInWatchList(false);
                return
            }catch (error){
                console.error("error removing movie from watchlist")
            }
            return
        }
        // new watchlist movie item
        const watchListItem = {
            movieTitle: details.title,
            movieId: movieId,
            posterPic: details.poster_path,
            movieDescription: details.overview,
        };
        try {
            // Call the API function
            dispatch(addMovieWatchlistThunk(watchListItem))
            setInWatchList(true);
            // If successful, you can optionally display a success message or update your UI
            // ...
        } catch (error) {
            // Handle the error here
            if (error.message === 'User not authenticated') {
                // Display an alert for the user to log in
                setErrorMessage('Please log in to add movies to your watchlist.');
            }
        }
    }

    const openVideoInNewWindow = () => {
        if (trailers !== '') {
            window.open(trailers, '_blank', 'width=600,height=400'); // Adjust width and height as needed
        }
    };
    const [details, setDetails] = useState(null);
    const [providers, setProviders] = useState(null);
    const [movieReviews, setMovieReviews] = useState(null);
    const [trailers,setTrailers] = useState(null);
    const [directorData, setDirectors] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const details = findMovieDetailsById(movieId);
                const providers = findMovieProvidersById(movieId);
                const reviews = getReviewsByMovieId(movieId);

                const grabDetails = async () => {
                    const a = await details;
                    setDetails(a)
                    handleSetStatus('details')
                    // extract trailers from details
                    const data = a.trailers;
                    const trailerUrl = generateTrailerUrl(data)
                    setTrailers(trailerUrl);
                    handleSetStatus('trailers')

                };
                const grabReviews = async ()=> {
                    const r = await reviews;
                    setMovieReviews(r);
                    handleSetStatus('reviews');
                }

                const grabProviders = async () => {
                    const c = await providers;
                    setProviders(c)
                    handleSetStatus('providers')
                    //console.log('individual movie providers: ', c)
                }
                grabDetails();
                grabProviders();
                grabReviews();
                // getting and setting most up-to-date profile info

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        checkWatchList();
        checkFavorites();

        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [movieId]); // if we have a new movie id we want to re-render


    console.log(movieReviews);

    if (!dataStatus.details || !dataStatus.providers) {
        return <div className="App">Loading...</div>;
    }
    if (dataStatus.details &&  dataStatus.providers)
    return (
        <div className= "bg-landing-page">
            <div className="row p-0 m-0">
                <NavigationSidebar/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-3 bg-dark mt-1 rounded-start-3" >
                        <div className="bg-image bg-dark">
                            <img className="rounded-4 p-2" src={url + details.poster_path} width="95%" height="95%" alt = ""/>

                        </div>

                    </div>
                    <div className="col-9 bg-dark mt-1 rounded-end-3">
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
                            {currentUser && (
                                <button className="bg-dark ms-2" onClick={watchlistClickHandler}>
                                    <i className={`fa-solid ${inWatchList ? 'fa-check' : 'fa-plus'} fa-2x trailer-icon`} style={{ color: "#f5f5f5" }}></i>
                                    <span className={`white-text nudge-up${inWatchList ? ' in-watchlist' : ''}`}>
                                    {inWatchList ? 'In Watchlist' : 'Watchlist'}
                                  </span>
                                </button>
                            )}
                            {currentUser && (
                                <button className = "bg-dark ms-2">
                                    <i
                                        className="fa-solid fa-heart fa-2x trailer-icon"
                                        style={{ color: inFavorites ? "#EC4D82" : "#f5f5f5" }}
                                        onClick = {favoritesClickHandler}>


                                    </i>
                                    <span className="white-text nudge-up ms-1">{inFavorites ? "In Favorites" : "Favorite"}</span>
                                </button>)}


                        </div>
                        <p className="fw-bold a1-font-25px white-font mb-0 pb-0 mt-2"> Overview</p>
                        <span className="white-font mt-0 pt-0">{details.overview}</span>

                        <br></br>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa fa-search"></i>
                        <br></br>
                        <div className = "row">
                            <div className = "col-2">
                                <div className = "float-start me-3">
                                    <p className="fw-bold a1-font-16px white-font mb-0 pb-0"> User Score </p>
                                    <span className="white-font mt-0 pt-0">{convertScoreToPercent(details.vote_average)}%</span>
                                </div>
                            </div>
                           <div className = "col-10">
                               <div className = "ms-3">
                                   <p className="fw-bold a1-font-16px white-font mb-0 pb-0">Directed By </p>
                                   <Directors data={details.credits.crew}/>
                               </div>
                           </div>
                        </div>
                    </div>
                </div>
                <div className="row pt-1">
                    < div className="col-9">
                        <span className="a1-font-25px fw-bold white-font"> Top Billed Cast</span>
                        <br></br>
                        <div>

                            {
                                <ApiCastScrollBar cast={details.credits.cast}/>
                            }
                        </div>
                    </div>
                    <div className="col-3 ">
                        <span className="a1-font-25px fw-bold white-font"> Stats</span>
                        <ul className="no-bullets mt-2 mb-0 bg-dark p-2 rounded-3">
                            <li>
                                <span className="fw-bold white-font"> Status</span>
                                <br></br>
                                <p className = "white-font"> {details.status}</p>
                            </li>
                            <li>
                                <span className="fw-bold white-font"> Original Language</span>
                                <br></br>
                                <p className = "white-font"> {extractOriginalLanguage(details)}</p>
                            </li>
                            <li>
                                <span className="fw-bold white-font">Budget</span>
                                <br></br>
                                <p className = "white-font"> ${details.budget.toLocaleString()}</p>
                            </li>
                            <li>
                                <span className="fw-bold white-font"> Revenue</span>
                                <br></br>
                                <p className = "white-font"> ${details.revenue.toLocaleString()}</p>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className="row mb-0 pb-0">
                    <div className = "col-9">
                        <span className="a1-font-25px fw-bold white-font">You May Also Like</span>
                        <RecommendationsScrollBar data = {details.recommendations.results}/>
                    </div>
                    <div className= "col-3">
                        <ApiWatchProviders data = {providers.results.US}/>
                    </div>
                </div>
                <div className = "row mt-0 pt-0">
                    <span className="a1-font-25px fw-bold white-font">Reviews</span>
                    <div className= "col-9">
                        {currentUser ? (
                            <ReviewPostForm user={currentUser} movieId={movieId} movie = {details} />
                        ) : (
                            <p className = "white-font">Please log in to post a review.</p>
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
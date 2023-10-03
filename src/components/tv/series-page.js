import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {fetchSeriesDetailsById, findSeriesSeasonDetails, fetchSeriesRecommendationsById, fetchSeriesCastById} from "../../services/tv-service";
import NavigationSidebar from "../navigation";
import {grabGenres} from "../../helper_functions/helper_functions";
import TvRecommendationsScrollBar from "./tv-recs-scroll-bar";
import SeasonScrollTileDynamic from "./season-scroll-tile-dynamic";
import ApiCastScrollBar from "../actor_scroll_bar/api-cast-scroll-bar";
import CurrentSeasonOverview from "./current-season-overview";
import EpisodeResultsList from "./episode-results-list";
import {grabSeriesCreators} from "../../helper_functions/helper_functions";
import {formatDate,convertScoreToPercent,generateImageUrl,extractLanguageName, extractSeriesNetworkData} from "../../helper_functions/helper_functions";

function SeriesPage () {
    const sid = useParams();
    const seriesId = sid.sid
    console.log(seriesId);
    const [details, setDetails] = useState(null);
    const [recs, setRecs]  = useState(null);
    const [seriesCast, setSeriesCast] = useState(null)
    const[currentSeasonDetails, setCurrentSeasonDetails] = useState(null)
    const [currentSeasonNumber, setCurrentSeasonNumber] = useState(1)
    const [isLoading, setLoading] = useState(true);
    const[episodeLoading, setEpisodeLoading] = useState(false);
    const imageUrl = "http://image.tmdb.org/t/p/w500";

    const [dataStatus,setDataStatus] = useState({
        details: false,
        recs: false,
        cast: false

    })
    const handleSetStatus = (property) => {
        setDataStatus((prevStatus) => ({
            ...prevStatus,
            [property]: true
        }));
    };
    function clearState () {
        setSeasonEpisodeData({})
        setDataStatus({
            details: false,
            recs: false,
            cast: false
        })
    }

    const [SeasonEpisodeData,setSeasonEpisodeData] = useState({})
    useEffect(() => {
        clearState();
    }, [seriesId]);

    const fetchSeasonData = async (seasonNumber) => {
        console.log("called fetchSeasonData, seasonNumber param: ", seasonNumber);
        try {
            if (!SeasonEpisodeData[seasonNumber]) {
                setEpisodeLoading(true);

                const seasonDetails = findSeriesSeasonDetails(seriesId, seasonNumber)
                const data = await seasonDetails;

                // Update the state with the fetched data
                setSeasonEpisodeData(prevState => ({
                    ...prevState,
                    [seasonNumber]: data,
                }));
                setEpisodeLoading(false);
            }
        }
        catch (error) {
        console.error('Error fetching season data:', error);
        }
    }


    useEffect(() => {
        const fetchSeriesData = async () => {
            try {
                const details = fetchSeriesDetailsById(seriesId);
                const recommendations = fetchSeriesRecommendationsById(seriesId);
                const cast = fetchSeriesCastById(seriesId);

                const grabDetails = async () => {
                    const a = await details;
                    setDetails(a)
                   // console.log(a)
                    //console.log(a.name);
                    handleSetStatus('details');
                    setLoading(false);
                };
                const grabRecs = async () =>{
                    const b = await recommendations;
                    handleSetStatus('recs')
                    setRecs(b)
                }
                const grabCast = async () => {
                    const c = await cast;
                    handleSetStatus('cast')
                    setSeriesCast(c)

                }
                grabDetails();
                grabRecs();
                grabCast();


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSeriesData();
    }, [seriesId]);
    // for handling clicking of different series
    console.log(dataStatus);


    const handleSeasonClick = async (seasonData) => {
        // Handle the click event here. You can use seasonData to access information about the clicked season.
        setCurrentSeasonDetails(seasonData);
        setCurrentSeasonNumber(seasonData.season_number);
        await fetchSeasonData(seasonData.season_number);
    };

    if (!dataStatus.recs || !dataStatus.details || !dataStatus.cast) {
        return <div className="App">Loading...</div>;
    }
    if (dataStatus.recs && dataStatus.details && dataStatus.cast) {

        const networkInfo = extractSeriesNetworkData(details);
        console.log(networkInfo)


        //console.log('details grabbed from for series page:', details);
        //console.log('name from details:', details.name)
        return (

            <>
                <div className="row p-0 m-0">
                    <NavigationSidebar/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-3 bg-dark mt-1">
                            <div className="bg-image mt-1">
                                <img className="" src={imageUrl + details.poster_path} width="95%" height="95%"/>

                            </div>
                        </div>
                        <div className="col-9 bg-dark mt-1">
                            <span className="fw-bold a1-font-32px white-font"> {details.name}</span> <span
                            className="a1-font-32px white-font"> </span>
                            <br></br>
                            <span
                                className="fst-italic white-font"> Aired {formatDate(details.first_air_date)}</span> . <span
                            className="white-font"> ({(grabGenres(details.genres))})</span> .
                            <br></br>
                            <br></br>

                            <p className="fst-italic a1-font-16px white-font"> {details.tagline}</p>
                            <p className="fw-bold a1-font-25px white-font mb-0 pb-0"> Overview</p>
                            <span className="white-font mt-0 pt-0">{details.overview}</span>
                            <br></br>
                            <br></br>
                            <p className="fw-bold a1-font-16px white-font mb-0 pb-0"> User Score </p>
                            <span
                                className="white-font mt-0 pt-0">{convertScoreToPercent(details.vote_average)} %</span>
                            <p className="fw-bold a1-font-16px white-font mb-0 pb-0 mt-3"> Creators</p>

                            <span className="white-font">{grabSeriesCreators(details.created_by)}</span>


                        </div>

                    </div>
                    <div className="row">
                        <div className="col-9">
                            <div className="m-1">
                                <h4 className = "white-font">Top Billed Cast</h4>
                                <ApiCastScrollBar cast={seriesCast.cast}/>
                                <h4 className = "white-font">Seasons</h4>
                                <div className="scroll_media-scroller snaps-inline bg-dark rounded-3 m-2 p-1">
                                    {details.seasons.map((season, i) => (
                                        <SeasonScrollTileDynamic
                                            key={i}
                                            season={season}
                                            onClickHandler={handleSeasonClick} // Pass the click handler as a prop
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className="col-3">
                            <ul className="no-bullets mt-2">
                                <li>
                                    <span className="fw-bold white-font"> Status</span>
                                    <br></br>
                                    <p className = "white-font"> {details.status}</p>
                                </li>
                                <li>
                                    <span className="fw-bold white-font"> Original Language</span>
                                    <br></br>
                                    <p className = "white-font"> {extractLanguageName(details.original_language)}</p>
                                </li>


                                <li>
                                    <span className="fw-bold white-font"> Network</span>
                                    <br></br>
                                    <p className="mb-0 pb-0 white-font"> {networkInfo.name}</p>
                                    <img className="network-logo-small float mt-0 pt-0 mb-2 "
                                         src={generateImageUrl(networkInfo.logo)}></img>
                                </li>
                                <li>
                                    <span className="fw-bold mt-2 white-font"> Type</span>
                                    <br></br>
                                    <p className = "white-font"> {details.type}</p>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div className="row mt-0 pt-0">
                        <div className="col-9 mt-0 pt-0 ">


                            <CurrentSeasonOverview season={currentSeasonDetails}/>

                            {/* Conditionally render loading text or EpisodeResultsList */}
                            {episodeLoading ? (
                                <p>Loading data...</p>
                            ) : (
                                SeasonEpisodeData[currentSeasonNumber] && (
                                    <EpisodeResultsList data={SeasonEpisodeData[currentSeasonNumber]}/>
                                )
                            )}


                        </div>

                    </div>
                    <div className="row">
                        <h5 className = "white-font">You May Also Like</h5>
                        <div>
                            <TvRecommendationsScrollBar recs={recs.results}/>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}
export default SeriesPage
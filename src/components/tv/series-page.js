import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {fetchSeriesDetailsById, findSeriesSeasonDetails} from "../../services/tv-service";
import NavigationSidebar from "../navigation";
import {extractOriginalLanguage, grabGenres, grabRuntime} from "../../helper_functions/helper_functions";
import SeasonResultsList from "./season-results-list";
import SeasonsScrollResults from "./season-results-scroll";
import SeasonScrollTile from "./season-scroll-tile";
import SeasonScrollTileDynamic from "./season-scroll-tile-dynamic";
import CurrentSeasonOverview from "./current-season-overview";
import EpisodeResultsList from "./episode-results-list";
import episodeData from "./hannibal-episodes.json";
import {grabSeriesCreators} from "../../helper_functions/helper_functions";
import {formatDate,convertScoreToPercent,generateImageUrl,extractLanguageName} from "../../helper_functions/helper_functions";

function SeriesPage () {
    const sid = useParams();
    const seriesId = sid.sid
    console.log(seriesId);
    const [details, setDetails] = useState(null);
    const[currentSeasonDetails, setCurrentSeasonDetails] = useState(null)
    const [currentSeasonNumber, setCurrentSeasonNumber] = useState(1)
    const [isLoading, setLoading] = useState(true);
    const[episodeLoading, setEpisodeLoading] = useState(false);
    const imageUrl = "http://image.tmdb.org/t/p/w500";

    const [SeasonEpisodeData,setSeasonEpisodeData] = useState({})

    const fetchSeasonData = async (seasonNumber) => {
        console.log("called fetchSeasonData, seasonNumber param: ", seasonNumber);
        try {
            if (!SeasonEpisodeData[seasonNumber]) {
                setEpisodeLoading(true);

                const seasonDetails = findSeriesSeasonDetails(seriesId, seasonNumber)
                const data = await seasonDetails;
                console.log("season specific data ", data)
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

                const grabDetails = async () => {
                    const a = await details;
                    setDetails(a)
                    setLoading(false);

                };

                grabDetails();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSeriesData();
    }, [seriesId]);
    // for handling clicking of different seasons

    const handleSeasonClick = async (seasonData) => {
        // Handle the click event here. You can use seasonData to access information about the clicked season.

        setCurrentSeasonDetails(seasonData);
        setCurrentSeasonNumber(seasonData.season_number);
        await fetchSeasonData(seasonData.season_number);
    };
    console.log('SeasonEpisodeData Dict:',SeasonEpisodeData);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    return (
        <>
            <div className="row p-0 m-0">
                <NavigationSidebar/>
            </div>
            <div className="container">
                <div className="row">
                    <div className = "col-3 bg-dark mt-1">
                        <div className="bg-image mt-1">
                            <img className="" src={imageUrl + details.poster_path} width="95%" height="95%"/>

                        </div>
                    </div>
                        <div className = "col-9 bg-dark mt-1">
                            <span className="fw-bold a1-font-32px white-font"> {details.name}</span> <span
                            className="a1-font-32px white-font"> </span>
                            <br></br>
                            <span className="fst-italic white-font"> Aired {formatDate(details.first_air_date)}</span> . <span
                            className="white-font"> ({(grabGenres(details.genres))})</span> .
                            <br></br>
                            <br></br>

                            <p className="fst-italic a1-font-16px white-font"> {details.tagline}</p>
                            <p className="fw-bold a1-font-25px white-font"> Overview</p>
                            <span className="white-font">{details.overview}</span>
                            <br></br>
                            <br></br>
                            <p className="fw-bold a1-font-16px white-font mb-0 pb-0"> User Score </p>
                            <span className="white-font mt-0 pt-0">{convertScoreToPercent(details.vote_average)} %</span>
                            <p className = "fw-bold a1-font-16px white-font mb-0 pb-0 mt-3"> Creators</p>

                            <span className="white-font">{grabSeriesCreators(details.created_by)}</span>


                        </div>

                </div>
                <div className = "row">
                    <div className = "col-9">
                        <div className = "m-1">
                            <div className="scroll_media-scroller snaps-inline">
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
                    <div className = "col-3">
                        <ul className="no-bullets mt-2">
                        <li>
                            <span className="fw-bold"> Status</span>
                            <br></br>
                            <p> {details.status}</p>
                        </li>
                        <li>
                            <span className="fw-bold"> Original Language</span>
                            <br></br>
                            <p> {extractLanguageName(details.original_language)}</p>
                        </li>


                        <li>
                            <span className="fw-bold"> Network</span>
                            <br></br>
                            <p className = "mb-0 pb-0"> {details.networks[0].name}</p>
                            <img className = "network-logo-small float mt-0 pt-0 mb-2"src = {generateImageUrl(details.networks[0].logo_path)}></img>
                        </li>
                        <li>
                            <span className = "fw-bold mt-2"> Type</span>
                            <br></br>
                            <p> {details.type}</p>
                        </li>
                    </ul>

                    </div>
                </div>
                <div className = "row">
                    <div className = "col-9">

                        <CurrentSeasonOverview season = {currentSeasonDetails}/>

                        {/* Conditionally render loading text or EpisodeResultsList */}
                        {episodeLoading ? (
                            <p>Loading data...</p>
                        ) : (
                            SeasonEpisodeData[currentSeasonNumber] && (
                                <EpisodeResultsList data={SeasonEpisodeData[currentSeasonNumber]} />
                            )
                        )}

                    </div>

                </div>

                </div>
        </>
    )
}
export default SeriesPage
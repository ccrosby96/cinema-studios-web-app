import {formatDate} from "../../helper_functions/helper_functions";
function EpisodeListItem (episode = {}) {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = url + episode.episode.still_path;
    const title = episode.episode.name;
    const overview = episode.episode.overview;
    const episodeNumber = episode.episode.episode_number;
    const airDate = episode.episode.air_date;
    const formattedDate = formatDate(airDate);
    const runtime = episode.episode.runtime;

    return (
        <div className ="list-group-item m-1">
            <div className="row">
                <div className="col-4">
                    <img className="card-img rounded-3 episode-list-item-img m-0 p-0" src= {poster_path} alt="Image Not Found"/>
                </div>
                <div className="col-8 m-0 p-0">
                    <div className="m-0 p-0">
                        <h5 className="mb-0 pb-0" >{episodeNumber}&nbsp;&nbsp;{title}</h5>
                        <span className = 'm-0 p-0 grey-text'>{formattedDate} . {runtime} min </span>
                        <p className="episode-overview-text">{overview}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default EpisodeListItem
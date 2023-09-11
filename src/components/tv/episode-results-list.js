import {Link} from "react-router-dom";
import EpisodeListItem from "./episode-list-item";
function EpisodeResultsList (data = {}) {

    const episodes = data.data.episodes;
    return (
        <>
            <ul className= "list-group no-bullets">
                {
                    episodes.map((episode, i) => {

                        return (
                                <EpisodeListItem episode={episode}/>
                        )
                    })
                }
            </ul>

        </>
    );

}
export default EpisodeResultsList;
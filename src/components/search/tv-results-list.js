
import {Link} from "react-router-dom";
import MovieRecTile from "../recommendations/movie_rec_tile";
import TVListItem from "./tv-list-item";
function TvResultsList ({shows}) {
    console.log("shows in TvResultsList", shows)
    if (shows.length === 0){
        return (<p className = "white-font"> No shows found ಠ╭╮ಠ</p>)
    }
    return (
        <>
            <ul className= "list-group no-bullets bg-dark">
                {
                    shows.map((show, i) => {

                        return (
                                <TVListItem show={show}/>
                        )
                    })
                }
            </ul>

        </>
    );

}
export default TvResultsList;
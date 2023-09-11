import {Route, Routes} from "react-router";
import MovieHome from "../components/home";
import IndividualActorPage from "../components/actor_page/api-actor-page";
import ActorPage from "../components/actor_page";
import SeriesPage from "../components/tv/series-page";

function TvRouting(){
    return (
        <Routes>
            <Route path = {"/series/:sid"} element = {<SeriesPage/>}/>
        </Routes>
    )
}
export default TvRouting;
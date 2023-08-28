import {Route, Routes} from "react-router";
import MovieHome from "../components/home/index.html";
import IndividualActorPage from "../components/actor_page/api-actor-page";
import ActorPage from "../components/actor_page";

function ActorRouting(){
    return (
        <Routes>
            <Route index element = {<ActorPage/>}/>
            <Route path = {"/actor/:aid"} element = {<IndividualActorPage/>}/>
        </Routes>
    )
}
export default ActorRouting;
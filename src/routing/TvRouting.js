import {Route, Routes} from "react-router";
import SeriesPage from "../components/tv/series-page";

function TvRouting(){
    return (
        <Routes>
            <Route path = {"/series/:sid"} element = {<SeriesPage/>}/>
        </Routes>
    )
}
export default TvRouting;
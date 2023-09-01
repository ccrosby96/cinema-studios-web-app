import {Route, Routes} from "react-router";
import MovieHome from "./index";
import MoviePage from "../movie_page";
import IndividualMoviePage from "../movie_page/individual-movie-page";



function MovieRouting(){
    return (
        <Routes>
            <Route index element = {<MovieHome/>}/>
            <Route path = {"/movie/:mid"} element = {<IndividualMoviePage/>}/>
            <Route path = {"/discover"} element = {<MovieHome/>}/>
            <Route path = {"/discover/:pid"} element = {<MovieHome/>}/>
        </Routes>
    )
}
export default MovieRouting;
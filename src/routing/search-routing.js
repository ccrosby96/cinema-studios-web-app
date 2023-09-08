import {Route, Routes} from "react-router";
import LandingSearchPage from "../components/search";
import MultiSearchResultsPage from "../components/multi-search-results";
function MultiSearchRouting(){
    return (
        <Routes>
            <Route index element = {<LandingSearchPage/>}/>
            <Route path = {"/query/:q"} element = {<MultiSearchResultsPage/>}/>
        </Routes>
    )
}
export default MultiSearchRouting;
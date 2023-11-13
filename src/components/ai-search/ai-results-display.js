import RecommendationsScrollBar from "../recommendations";
import AIResultsScroll from "./ai-results-scroll-bar";
import {Link} from "react-router-dom";
import MovieRecTile from "../recommendations/movie_rec_tile";
function AiResultsDisplay ({resultsDict}) {
    console.log('resultsDict in AiDisplay', resultsDict);
    const allMovies = [].concat(...Object.values(resultsDict));
    return (
        <div className = "container">
            {/*{Object.keys(resultsDict).map(movieTitle => (*/}
            {/*    <div key={movieTitle}>*/}
            {/*            <p className = "white-font">{movieTitle}</p>*/}
            {/*            <AIResultsScroll results = {resultsDict[movieTitle]}/>*/}
            {/*    </div>*/}
            {/*))}*/}
            <div className = "row">
                {allMovies.map((element, index) => (
                    <Link to={`/movies/movie/${element.id}`} className= "text-decoration-none col-lg-2 col-md-3 col-sm-12">
                        <div key={index} className="">
                            <MovieRecTile movie = {element}/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default AiResultsDisplay;
import MovieRecTile from "../recommendations/movie_rec_tile";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {fetchMovieSearchNextPage} from "../../thunks/movie-thunks";
import {useParams} from "react-router";

function SearchResults () {
        const params = useParams()
        const pageNumber = parseInt(params.pid);
        console.log('pageROute in searchResults', pageNumber);
        const dispatch = useDispatch();
        const searchResults = useSelector(state => state.searchResults.results)
        const currentPage = useSelector(state => state.searchResults.currentPage)
        const maxPage = useSelector(state => state.searchResults.maxPage)
        const searchUrl = useSelector(state => state.searchResults.url)
        const pageResults = searchResults[pageNumber]
        const loading = useSelector (state => state.searchResults.loading)

        const handleNextPage = () => {
                const searchParams = {
                        currentPage: pageNumber,
                        url: searchUrl
                }
                console.log(searchParams);
                dispatch(fetchMovieSearchNextPage(searchParams));

        }
        if (loading) {
                return (<span> Loading Page</span>)
        }
        else if (searchResults.length >= pageNumber){
                return (

                    <div className="container justify-content-center">
                            <div className="row">
                                    {pageResults.map((element, index) => (
                                        <Link to={`/movies/movie/${element.id}`} className= "text-decoration-none col-lg-2 col-md-6">
                                                <div key={index} className="">
                                                        <MovieRecTile movie = {element}/>
                                                </div>
                                        </Link>
                                    ))}
                            </div>
                            <div>
                                    {currentPage === maxPage? (
                                        // Render one component if the condition is met
                                        <span>End of Search Results =D</span>
                                    ) : (
                                        // Render another component if the condition is not met
                                        <Link to = {`/movies/discover/${currentPage + 1}`}>
                                                <button onClick= {handleNextPage} className="btn btn-secondary mt-4 centralize-button">
                                                        Page {pageNumber + 1}
                                                </button>
                                        </Link>
                                    )}
                            </div>
                    </div>
                );

        }

};

export default SearchResults;
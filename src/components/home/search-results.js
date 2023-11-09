import MovieRecTile from "../recommendations/movie_rec_tile";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {fetchMovieSearchNextPage,fetchMovieSearchByPage} from "../../thunks/movie-thunks";
import {useParams} from "react-router";
import InitialMovies from "./initial-movies-display";
import PageNavigationButtons from "./page-navigation-buttons";
import {useEffect} from "react";

function SearchResults () {
        const params = useParams()
        const pageNumber = parseInt(params.pid);
        console.log('pageROute in searchResults', pageNumber);
        const dispatch = useDispatch();
        const searchResults = useSelector(state => state.searchResults.results)
        const currentPage = useSelector(state => state.searchResults.currentPage)
        const searchResultsDict = useSelector(state => state.searchResults.pageResults);
        const maxPage = useSelector(state => state.searchResults.maxPage)
        const searchUrl = useSelector(state => state.searchResults.url)
        const pageResults = searchResults[pageNumber]
        const loading = useSelector (state => state.searchResults.loading)
        console.log("searchResultsArr", searchResults);
        console.log("searchResultsDict", searchResultsDict);

        useEffect(() => {
                // Check if the page number is not in the dictionary
                if (!(pageNumber in searchResultsDict)) {
                        console.log("in SearchResults useEffect, calling fetchMovieSearchByPage with", pageNumber);
                        // Fetch data for the page
                        const searchParams = {
                                requestedPage: pageNumber,
                                url: searchUrl,
                        };
                        dispatch(fetchMovieSearchByPage(searchParams));
                }
                else {
                        console.log(`page number ${pageNumber} already cached in searchResultsDict`);
                }
        }, [pageNumber]);
        const handleNavigatePage = (page) => {
                // if we already cached this page no need to call backend again
                if (page in searchResultsDict){
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        return
                }
                const searchParams = {
                        requestedPage:page,
                        url: searchUrl
                }
                dispatch(fetchMovieSearchByPage(searchParams));
                window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (loading) {
                return (<span> Loading Page</span>)
        }
        else if (Number.isNaN(pageNumber)){
                return (<InitialMovies/>)
        }
        else if (pageNumber in searchResultsDict){
                const currentPageResults = searchResultsDict[pageNumber]
                return (

                    <div className="container justify-content-center">
                            <div className="row">
                                    {currentPageResults.map((element, index) => (
                                        <Link to={`/movies/movie/${element.id}`} className= "text-decoration-none col-lg-2 col-md-3 col-sm-12">
                                                <div key={index} className="">
                                                        <MovieRecTile movie = {element}/>
                                                </div>
                                        </Link>
                                    ))}
                            </div>
                            <div>
                                    <PageNavigationButtons currentPage={pageNumber} handleNavigatePage={handleNavigatePage}/>
                            </div>
                    </div>
                );
        }
};

export default SearchResults;
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {setMaxPage} from "../../reducers/actions";

function PageNavigationButtons ({currentPage,handleNavigatePage}) {
    const searchObject = useSelector(state => state.searchResults)
    const lastPage = searchObject.maxPage;
    const minPage = 1;

    // Determine the number of buttons to generate (up to 5)
    const numButtonsDown = Math.min(currentPage - minPage, 5);
    const numButtonsUp = Math.min(lastPage - currentPage,5);

    // Create an array of page numbers based on the current page
    const pageNumbers = Array.from({ length: numButtonsDown }, (_, index) => currentPage - index-1).reverse();
    const pageUpNumbers = Array.from({length:numButtonsUp}, (_,index)=>currentPage + index + 1 )
    console.log(pageNumbers)

    return (
        <div>
            {currentPage > 6 && (
            <Link key={1} to={`/movies/discover/${1}`}>
                <button onClick={() => handleNavigatePage(1)} className="btn btn-secondary mt-4 centralize-button m-1">
                    {1}
                </button>
            </Link>)}
            {pageNumbers.map((num) => (
                <Link key={num} to={`/movies/discover/${num}`}>
                    <button onClick={() => handleNavigatePage(num)} className="btn btn-secondary mt-4 centralize-button m-1">
                        {num}
                    </button>
                </Link>
            ))}
            <button className =  "btn btn-primary mt-4 centralize-button m-1"> Page {currentPage}</button>
            {pageUpNumbers.map((num) => (
                <Link key={num} to={`/movies/discover/${num}`}>
                    <button onClick={() => handleNavigatePage(num)} className="btn btn-secondary mt-4 centralize-button m-1">
                        {num}
                    </button>
                </Link>
            ))}
            {currentPage < lastPage-6 && (
            <Link key={lastPage} to={`/movies/discover/${lastPage}`}>
                <button onClick={() => handleNavigatePage(lastPage)} className="btn btn-secondary mt-4 centralize-button m-1">
                    {lastPage}
                </button>
            </Link>)}
        </div>
    )
}
export default PageNavigationButtons
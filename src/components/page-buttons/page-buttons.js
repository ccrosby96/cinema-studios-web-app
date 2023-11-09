import {Link} from "react-router-dom";
function PageButtons ({currentPage,handleNavigatePage, maxPage}) {
    const lastPage = maxPage;
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

                    <button onClick={() => handleNavigatePage(1)} className="btn btn-secondary mt-4 centralize-button m-1">
                        {1}
                    </button>
               )}
            {pageNumbers.map((num) => (

                    <button onClick={() => handleNavigatePage(num)} className="btn btn-secondary mt-4 centralize-button m-1">
                        {num}
                    </button>
            ))}
            <button className =  "btn btn-primary mt-4 centralize-button m-1"> Page {currentPage}</button>
            {pageUpNumbers.map((num) => (

                    <button onClick={() => handleNavigatePage(num)} className="btn btn-secondary mt-4 centralize-button m-1">
                        {num}
                    </button>
            ))}
            {currentPage < lastPage-6 && (
                    <button onClick={() => handleNavigatePage(lastPage)} className="btn btn-secondary mt-4 centralize-button m-1">
                        {lastPage}
                    </button>
               )}
        </div>
    )
}
export default PageButtons
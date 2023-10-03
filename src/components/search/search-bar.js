import "../../styles/search.css"
import '@fortawesome/fontawesome-free/css/all.css';
import {useState} from "react"; // Import Font Awesome CSS
import {useDispatch, useSelector} from "react-redux";
import {fetchMultiSearchResults} from "../../thunks/multi-search-thunks";
import {useNavigate } from 'react-router-dom';

function SearchBar (){
        const dispatch = useDispatch();
        const [searchQuery, setSearchQuery] = useState('');
        let navigate = useNavigate()
        const handleInputChange = (event) => {
            setSearchQuery(event.target.value);
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                // Handle the Enter key press, e.g., trigger a search
                const searchParams = {
                    searchText: searchQuery
                }
                performSearch(searchQuery);
                console.log("User pressed Enter!")
                console.log(searchParams)
                dispatch(fetchMultiSearchResults(searchParams))
                navigate(`/search/query/${searchQuery}`)
            }
        };
        const performSearch = () => {
            // Implement your search logic here
            console.log(`Performing search for: ${searchQuery}`);
            const searchParams = {
                searchText: searchQuery
            }
            // You can call an API, update state, or perform any relevant action here.
        };
    return (

        <div>
            <div className="row d-flex justify-content-center align-items-center mb-3">

                <div className="col-md-6 mt-4">

                    <div className="form">
                        <i className="fa fa-search"></i>
                        <input onChange={handleInputChange}
                               onKeyDown={handleKeyDown}
                               type="text"
                               className="form-control form-input"
                               placeholder="Search Movies, TV, People..."/>

                    </div>

                </div>


            </div>
        </div>

    );

}
export default SearchBar;
import "../../styles/search.css"
import '@fortawesome/fontawesome-free/css/all.css';
import {useState} from "react"; // Import Font Awesome CSS

function SearchBar (){

        const [searchQuery, setSearchQuery] = useState('');

        const handleInputChange = (event) => {
            setSearchQuery(event.target.value);
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                // Handle the Enter key press, e.g., trigger a search
                performSearch(searchQuery);
            }
        };
        const performSearch = (query) => {
            // Implement your search logic here
            console.log(`Performing search for: ${query}`);
            // You can call an API, update state, or perform any relevant action here.
        };
    return (

        <div>
            <div className="row d-flex justify-content-center align-items-center">

                <div className="col-md-6 mt-4">

                    <div className="form">
                        <i className="fa fa-search"></i>
                        <input onChange={handleInputChange}
                               onKeyDown={handleKeyDown}
                               type="text"
                               className="form-control form-input"
                               placeholder="Search Movies, TV, People..."/>
                        <span className="left-pan"><i className="fa fa-microphone"></i></span>
                    </div>

                </div>


            </div>
        </div>

    );

}
export default SearchBar;
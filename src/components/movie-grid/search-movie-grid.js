import SearchMovieTile from "./movie-tile.js";
import MovieRecTile from "../recommendations/movie_rec_tile";
import { Link } from "react-router-dom";

const SearchMovieGrid = ({ movies }) => {
    // Ensure that there are movies and they are not empty
    if (!movies || movies.length === 0) {
        return null; // You can handle this case as needed
    }

    return (
        <div className="row row-cols-lg-4 row-cols-md-4 row-cols-sm-2">
            {movies.map((element, index) => (
                <div key={index} className="mt-4 mb-4">
                    <Link to={`/movies/movie/${element.id}`} className="text-decoration-none">
                        <SearchMovieTile movie={element} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default SearchMovieGrid;

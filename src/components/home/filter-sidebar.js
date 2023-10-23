import Slider from "../rating_scroll_bar/scrollable_bar";
import { useDispatch, useSelector } from 'react-redux';
import {toggleGenreFilter, toggleRatingFilter, setReleaseYears,setAudienceScore} from "../../reducers/actions";
import {useState} from "react";


function FilterSidebar () {
    const dispatch = useDispatch();
    const genreFilters = useSelector(state => state.filters.genre);
    const ratingFilters = useSelector(state => state.filters.ratings);
    const { startYear, endYear } = useSelector(state => state.filters.years);
    const audienceScore = useSelector(state => state.filters.score);
    const store = useSelector(state => state.filters);

    const [localStartYear, setLocalStartYear] = useState(startYear);
    const [localEndYear, setLocalEndYear] = useState(endYear);

    const [showCheckmark, setShowCheckmark] = useState(false);

    const handleYearRangeButtonClick = () => {
        // Show the checkmark
        setShowCheckmark(true);

        // Set a timeout to hide the checkmark after 2 seconds (adjust the duration as needed)
        setTimeout(() => {
            setShowCheckmark(false);
        }, 1000);
    };
    const handleGenreButtonClick = (genre) => {
        dispatch(toggleGenreFilter(genre));
    };
    const handleRatingButtonClick = (rating) => {
        dispatch(toggleRatingFilter(rating));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setReleaseYears(localStartYear, localEndYear));
    };
    const handleSliderChange = (e) => {
        dispatch(setAudienceScore(parseInt(e.target.value)));
    };



    return (
        <div className = "container">
            <h5 className = "white-font">Release Dates </h5>
            <form onSubmit={handleSubmit}>
                <label className = "white-font">
                    Start Year:
                    <input
                        type="number"
                        value={localStartYear}
                        className = "bg-secondary"
                        onChange={(e) => setLocalStartYear(e.target.value)}
                    />
                </label>
                <label className = "white-font">
                    End Year:
                    <input
                        type="number"
                        value={localEndYear}
                        className = "bg-secondary"
                        onChange={(e) => setLocalEndYear(e.target.value)}
                    />
                </label>
                <button onClick={handleYearRangeButtonClick} type="submit" className = "btn btn-secondary mt-2 mb-2 float-start">Set Release Years</button>
                {showCheckmark && <div className="checkmark color-white" style = {{color: "white"}}>&#10004;</div>}
            </form>
            <h5 className="white-font mt-2">Genres</h5>

            <ul className="m-0 p-0 mt-1">
                <button
                    onClick={() => handleGenreButtonClick('Horror')}
                    className={genreFilters['Horror'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    Horror
                </button>
                <button
                    onClick={() => handleGenreButtonClick('Thriller')}
                    className={genreFilters['Thriller'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    Thriller
                </button>
                <button
                    onClick={() => handleGenreButtonClick('Comedy')}
                    className={genreFilters['Comedy'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    Comedy
                </button>
                <button
                    onClick={() => handleGenreButtonClick('Crime')}
                    className={genreFilters['Crime'] ? 'btn btn-primary m-1 white-font' : 'btn btn-secondary m-1 white-font'}
                >
                    Crime
                </button>
                <button
                    onClick={() => handleGenreButtonClick('Documentary')}
                    className={genreFilters['Documentary'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    Documentary
                </button>

                <button
                    onClick={() => handleGenreButtonClick('Drama')}
                    className={genreFilters['Drama'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    Drama
                </button>
                <button
                    onClick={() => handleGenreButtonClick('Family')}
                    className={genreFilters['Family'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    Family
                </button>
                <button
                    onClick={() => handleGenreButtonClick('Fantasy')}
                    className={genreFilters['Fantasy'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    Fantasy
                </button>
                <button
                    onClick={() => handleGenreButtonClick('History')}
                    className={genreFilters['History'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    History
                </button>
                <button
                    onClick={() => handleGenreButtonClick('Music')}
                    className={genreFilters['Music'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    Music
                </button>
                <button
                    onClick={() => handleGenreButtonClick('Mystery')}
                    className={genreFilters['Mystery'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    Mystery
                </button>
                <button
                    onClick={() => handleGenreButtonClick('Romance')}
                    className={genreFilters['Romance'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    Romance
                </button>
                <button
                    onClick={() => handleGenreButtonClick('Scify')}
                    className={genreFilters['Scify'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    Science Fiction
                </button>
                <button
                    onClick={() => handleGenreButtonClick('War')}
                    className={genreFilters['War'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    War
                </button>
                <button
                    onClick={() => handleGenreButtonClick('Western')}
                    className={genreFilters['Western'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    Western
                </button>

            </ul>
            <h5 className = "white-font">Certification</h5>
            <ul className = "m-0 p-0 mt-1">
                <button
                    onClick={() => handleRatingButtonClick('R')}
                    className={ratingFilters['R'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    R
                </button>
                <button
                    onClick={() => handleRatingButtonClick('PG13')}
                    className={ratingFilters['PG13'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    PG-13
                </button>
                <button
                    onClick={() => handleRatingButtonClick('G')}
                    className={ratingFilters['G'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    G
                </button>
                <button
                    onClick={() => handleRatingButtonClick('PG')}
                    className={ratingFilters['PG'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    PG
                </button>
                <button
                    onClick={() => handleRatingButtonClick('NC17')}
                    className={ratingFilters['NC17'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
                >
                    NC-17
                </button>
            </ul>
            <h5 className = "white-font">User Rating</h5>

            <Slider value={audienceScore} max = {100} step = {5} onChange={handleSliderChange} />
            <div className="slider-value white-font">Rating: {audienceScore}%</div>


        </div>
    );
}
export default FilterSidebar;
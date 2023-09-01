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
        <div>
            <h5>Release Dates </h5>
            <form onSubmit={handleSubmit}>
                <label>
                    Start Year:
                    <input
                        type="number"
                        value={localStartYear}
                        className = "bg-light-subtle"
                        onChange={(e) => setLocalStartYear(e.target.value)}
                    />
                </label>
                <label>
                    End Year:
                    <input
                        type="number"
                        value={localEndYear}
                        className = "bg-light-subtle"
                        onChange={(e) => setLocalEndYear(e.target.value)}
                    />
                </label>
                <button type="submit" className = "btn btn-secondary mt-1">Set Release Years</button>
            </form>
            <h5>Genres</h5>

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
                    className={genreFilters['Crime'] ? 'btn btn-primary m-1' : 'btn btn-secondary m-1'}
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
            <h5>Certification</h5>
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
            <h5>User Rating</h5>

            <Slider value={audienceScore} onChange={handleSliderChange} />
            <div className="slider-value">Rating: {audienceScore}%</div>


        </div>
    );
}
export default FilterSidebar;
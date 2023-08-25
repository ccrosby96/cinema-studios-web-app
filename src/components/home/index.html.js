import NavigationSidebar from "../navigation";
import MovieBox from "../movie_box";
import Movie_rec_tile from "../recommendations/movie_rec_tile";
import MovieScrollBar from "./movie_scroll";
import trending from "./trending.json"
import popular from "./popular.json"
import MovieGrid from "./movie_grid";
import {useState} from "react";
import ToggleButton from "./toggle_button";
import Slider from "../rating_scroll_bar/scrollable_bar";
function MovieHome() {
    const data = trending.results;
    const pop = popular.results;
    //console.log("movie scroll data", data);
    const [certOptions,setCertOptions] = useState({
        R: false,
        PG13: false,
        PG: false,
        G: false,
        NC17: false,
        NR: false
    })

    const [options, setOptions] = useState({
        Horror: false,
        Thriller: false,
        Comedy: false,
        Crime: false,
        Documentary: false,
        Drama: false,
        Family: false,
        Fantasy: false,
        History: false,
        Music: false,
        Mystery: false,
        Romance: false,
        Scify: false,
        War: false,
        Western:false

    });
    const [sliderValue, setSliderValue] = useState(50); // Initial value

    const handleSliderChange = (event) => {
        const newValue = parseInt(event.target.value);
        setSliderValue(newValue);
    };


    const handleToggle = (option) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option],
        }));
        //console.log(options);
    };
    const handleCertToggle = (certOption) => {
        setCertOptions((prevOptions) => ({
            ...prevOptions,
            [certOption]: !prevOptions[certOption],
        }));
        //console.log(options);
    };
    //console.log(options)
    console.log(certOptions)
    return (
        <>
            <div className="row p-0 m-0 bg-color">
                <NavigationSidebar/>
                <div className="container">
                    <div className="row">
                        <div className = 'col-2'>
                            <h5>Release Dates </h5>
                            <form>
                                <label htmlFor="start-date">Start Date:</label>
                                <input className = "bg-light-subtle"type="date" id="start-date" name="start-date" required/>
                                <br></br>
                                <label htmlFor="end-date">End Date:</label>
                                <input className = "bg-light-subtle"type="date" id="end-date" name="end-date" required/>
                                <br></br>
                                <input className="bg-secondary" type="submit" value="Submit"/>
                            </form>
                            <h5>Genres</h5>

                            <ul className="m-0 p-0 mt-1">

                                <ToggleButton
                                    label="Horror"
                                    initialValue={options.Horror}
                                    onToggle={() => handleToggle('Horror')}
                                />
                                <ToggleButton
                                    label="Thriller"
                                    initialValue={options.Thriller}
                                    onToggle={() => handleToggle('Thriller')}
                                />
                                <ToggleButton
                                    label="Comedy"
                                    initialValue={options.Comedy}
                                    onToggle={() => handleToggle('Comedy')}
                                />
                                <ToggleButton
                                    label="Crime"
                                    initialValue={options.Crime}
                                    onToggle={() => handleToggle('Crime')}
                                />
                                <ToggleButton
                                    label="Documentary"
                                    initialValue={options.Documentary}
                                    onToggle={() => handleToggle('Documentary')}
                                />
                                <ToggleButton
                                    label="Drama"
                                    initialValue={options.Drama}
                                    onToggle={() => handleToggle('Drama')}
                                />
                                <ToggleButton
                                    label="Family"
                                    initialValue={options.Family}
                                    onToggle={() => handleToggle('Family')}
                                />
                                <ToggleButton
                                    label="Fantasy"
                                    initialValue={options.Fantasy}
                                    onToggle={() => handleToggle('Fantasy')}
                                />
                                <ToggleButton
                                    label="History"
                                    initialValue={options.History}
                                    onToggle={() => handleToggle('History')}
                                />
                                <ToggleButton
                                    label="Music"
                                    initialValue={options.Music}
                                    onToggle={() => handleToggle('Music')}
                                />
                                <ToggleButton
                                    label="Mystery"
                                    initialValue={options.Mystery}
                                    onToggle={() => handleToggle('Mystery')}
                                />
                                <ToggleButton
                                    label="Romance"
                                    initialValue={options.Romance}
                                    onToggle={() => handleToggle('Romance')}
                                />
                                <ToggleButton
                                    label="Science Fiction"
                                    initialValue={options.Scify}
                                    onToggle={() => handleToggle('Scify')}
                                />
                                <ToggleButton
                                    label="War"
                                    initialValue={options.War}
                                    onToggle={() => handleToggle('War')}
                                />
                                <ToggleButton
                                    label="Western"
                                    initialValue={options.Western}
                                    onToggle={() => handleToggle('Western')}
                                />
                            </ul>
                            <h5>Certification</h5>
                            <ul className = "m-0 p-0 mt-1">
                                <ToggleButton
                                    label="R"
                                    initialValue={certOptions.R}
                                    onToggle={() => handleCertToggle('R')}
                                />
                                <ToggleButton
                                    label="PG-13"
                                    initialValue={certOptions.PG13}
                                    onToggle={() => handleCertToggle('PG13')}
                                />
                                <ToggleButton
                                    label="G"
                                    initialValue={certOptions.G}
                                    onToggle={() => handleCertToggle('G')}
                                />
                                <ToggleButton
                                    label="PG"
                                    initialValue={certOptions.PG}
                                    onToggle={() => handleCertToggle('PG')}
                                />
                                <ToggleButton
                                    label="NC-17"
                                    initialValue={certOptions.NC17}
                                    onToggle={() => handleCertToggle('NC17')}
                                />
                            </ul>
                            <h5>User Rating</h5>

                            <Slider value={sliderValue} onChange={handleSliderChange} />
                            <div className="slider-value">Rating: {sliderValue}%</div>


                        </div>
                        <div className = 'col-10'>
                            <span className="a1-font-25px fw-bold"> Trending</span>
                            <div>

                                <MovieScrollBar movies = {data}/>

                                <span className="a1-font-25px fw-bold"> Popular</span>
                                <MovieGrid movies = {pop}/>

                            </div>
                        </div>




                    </div>
                    <div className="row">

                        Cinema Studios
                    </div>
                </div>

            </div>
        </>
    );
}

export default MovieHome;
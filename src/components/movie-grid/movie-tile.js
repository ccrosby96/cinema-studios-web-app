import React from 'react';
import {truncateString} from "../../helper_functions/helper_functions";
import style from "../../styles/card-hover.css"
function MovieSearchTile({ movie }) {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = url + movie.poster_path;
    const title = movie.title;
    const vote_average = movie.vote_average.toPrecision(2);

    const titleTruncated = truncateString(title, 38)


    // Calculate the fixed aspect ratio height based on your design
    const fixedHeight = '400px'; // Adjust this value as needed
    const fixedWidth = '300px;'

    const percent = (vote_average / 10 * 100).toPrecision(2);

    return (
        <div className="  rounded-top-2 mb-4 mt-4 hover-card-container" style={{ height: fixedHeight, width: fixedWidth }}>
            <img
                src={poster_path}
                alt="Not Found"
                className="img-fluid rounded-3 rounded-top-3"
                style={{ height: '375px',width: "300px", objectFit: 'cover' }} // Ensure the image covers the fixed height
            />
            <div className = "bg-movie-card p-2 m-0 mb-5 rounded-bottom-2">
                <span className="card-text a1-font-16px mt-1 pt-0 white-font ">{vote_average}</span>
                <i className="fa-solid fa-star color-yellow ms-2 "></i>
                <br/>
                <span className="title a1-font-16px mb-0 pb-0 white-font ">{titleTruncated}</span>
            </div>
        </div>
    );
}

export default MovieSearchTile;

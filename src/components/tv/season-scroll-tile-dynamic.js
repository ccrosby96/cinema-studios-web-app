// SeasonScrollTile.js
import React from 'react';

function SeasonScrollTileDynamic({ season, onClickHandler }) {
    const handleClick = () => {
        // Call the onClickHandler function with the season data or any relevant data you need.
        onClickHandler(season);
    };
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = url + season.poster_path;
    const title = season.name;
    const vote_average = season.vote_average;
    const percent = (vote_average / 10 * 100).toPrecision(2);
    const episodeCount = season.episode_count;

    if (season.season_number === 0){
        return <></>
    }

    return (
        <div className="hover-card-container" onClick={handleClick}>
            <img
                src= {poster_path}
                alt="Not Found"
                className = "img-fluid rounded-3 m-0 p-1"
                style = {{height: "300px",width:"220px", objectFit: "cover"}}/>
            <div className = "p-2 m-0 rounded-bottom-3">
                <span className="title a1-font-16px mb-0 pb-0 white-font me-2">{title}</span>
                <span className="card-text a1-font-16px m-0 p-0 white-font float-end">{vote_average}
                    <i className="fa-solid fa-star color-yellow ms-2 p-0 "></i></span>

                <br/>
                <span className="card-text a1-font-16px mt-1 pt-0 white-font float-start">{episodeCount} Episodes </span>

            </div>

        </div>
    );
}

export default SeasonScrollTileDynamic;

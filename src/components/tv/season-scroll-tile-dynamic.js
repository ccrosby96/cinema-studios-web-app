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
        <div className="scroll_media-element" onClick={handleClick}>
            <img
                src= {poster_path}
                alt="Not Found"/>
            <span className="title a1-font-16px mb-0 pb-0 white-font">{title}</span>
            <span className="card-text a1-font-16px mt-1 pt-0 white-font float-end">{percent}%  &nbsp;&nbsp;{episodeCount} Episodes </span>
        </div>
    );
}

export default SeasonScrollTileDynamic;

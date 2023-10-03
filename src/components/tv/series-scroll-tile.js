
function SeriesScrollTile({series}) {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = url + series.poster_path;
    const title = series.name;
    const vote_average = series.vote_average.toPrecision(2);

    return (

        <div className="hover-card-container m-0 p-0">
            <img
                src= {poster_path}
                alt="Not Found"
                className = "img-fluid rounded-3 m-0 p-0"
                style = {{height: "310px",width:"230px", objectFit: "cover"}}/>
            <div className = "p-2 m-0 rounded-bottom-3">
                <span className="card-text a1-font-16px mt-1 pt-0 white-font">{vote_average}</span>
                <i className="fa-solid fa-star color-yellow ms-2 "></i>
                <br/>
                <span className="title a1-font-16px mb-0 pb-0 white-font">{title}</span>
            </div>
        </div>


    );
}

export default SeriesScrollTile;

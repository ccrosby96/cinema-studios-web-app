import style from "../../styles/card-hover.css"
function MovieTile ({movie})

 {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = movie.poster_path
        ? url +  movie.poster_path
        : "https://media.istockphoto.com/id/1039351052/vector/movie-and-film-festival-poster-template-design-modern-retro-vintage-style.jpg?s=612x612&w=0&k=20&c=aPVSLX7VlJj7DYBZ8afyj9ca15qoZEeZkLj_1exaUfE="
    const title = movie.title;
    const vote_average = isNaN(movie.vote_average) ? '' : movie.vote_average.toPrecision(2);

    //console.log("In actor card, headshot_url is ", poster_path);
    return (

        <div className="hover-card-container m-0">
            <img
                src= {poster_path}
                alt="Not Found"
                className = "rounded-3 img-fluid"
                style = {{height: "300px", width: "200px"}}
            />
            <div className = " p-2 m-0 rounded-bottom-3">
                <span className="card-text a1-font-16px mt-1 pt-0 white-font">{vote_average}</span>
                <i className="fa-solid fa-star color-yellow ms-2 "></i>
                <br/>
                <span className="title a1-font-16px mb-0 pb-0 white-font">{title}</span>
            </div>
        </div>

    );
}

export default MovieTile;

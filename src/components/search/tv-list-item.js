import {convertScoreToPercent, formatDate} from "../../helper_functions/helper_functions";
import {Link} from "react-router-dom";
function TVListItem ({show} ) {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = show.poster_path
        ? url +  show.poster_path
        : "https://media.istockphoto.com/id/1039351052/vector/movie-and-film-festival-poster-template-design-modern-retro-vintage-style.jpg?s=612x612&w=0&k=20&c=aPVSLX7VlJj7DYBZ8afyj9ca15qoZEeZkLj_1exaUfE=";
    const title = show.name;
    const overview = show.overview;
    const score = show.vote_average;
    const airDate = show.first_air_date;

    return (
        <div className ="list-group-item p-1 bg-dark border-secondary-subtle rounded-3 m-1">
            <div className="row">
                <div className="col-2">
                    <Link to = {`/tv/series/${show.id}`} className = "text-decoration-none m-0 p-0">
                        <img className="card-img rounded-3 m-0 p-0 img-fluid" src= {poster_path} alt="Image Not Found"/>
                    </Link>

                </div>
                <div className="col-10 m-0 p-0">
                    <div className="m-0 p-0">
                        <h5 className="mb-0 pb-0 white-font">{title}</h5>
                        <span className = "grey-text mt-0 pt-0 grey-text">{formatDate(airDate)}</span>
                        <p className="white-font">{overview}</p>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default TVListItem
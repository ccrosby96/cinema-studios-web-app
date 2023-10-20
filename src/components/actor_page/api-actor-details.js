import MovieScrollBar from "../home/movie_scroll";
import { calculateAge, grabPersonGender } from "../../helper_functions/helper_functions";

function ApiActorDetails(props) {
    let actor = props.actor;
    let films = props.films.cast;
    const url_prefix = "http://image.tmdb.org/t/p/w500";
    const headshot = url_prefix + actor.profile_path;

    console.log("actor in apiactordetails: ", actor);
    console.log("known fors in apiactordetails: ", films);

    return (
        <div className = "container">
            <div className="row bg-landing-page">
                <div className="col-3">
                    <div className="bg-dark rounded-3 mt-2 text-center">
                        <ul type="none" className="d-flex flex-column m-0 p-0">
                            <li className = "p-3">
                                <img src={headshot} alt="Headshot" className="img-fluid rounded-3" />
                            </li>
                            <h4 className="m-1 white-font">Personal Information</h4>
                            <li className="m-3 white-font">
                                <b>Name</b>: {actor.name}
                            </li>
                            <li className="m-3 white-font">
                                <b className="white-font">Gender</b>: {grabPersonGender(actor.gender)}
                            </li>
                            <li className="m-3 white-font">
                                <b className="white-font"> Birthday</b>: {actor.birthday} ({calculateAge(actor.birthday)})
                            </li>
                            <li className="m-3 white-font">
                                <b className="white-font">Place of Birth</b>: {actor.place_of_birth}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-9">
                    <div className = "mt-2">
                        <h1 className="white-font">{actor.name}</h1>

                        <h5 className="white-font">Biography</h5>
                        <p className="white-font"> {actor.biography}</p>

                        <h5 className="white-font border-bottom">Known For</h5>



                    </div>

                    <MovieScrollBar movies={films} />
                </div>
            </div>
        </div>
    );
}

export default ApiActorDetails;

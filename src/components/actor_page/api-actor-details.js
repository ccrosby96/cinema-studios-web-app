import MovieScrollBar from "../home/movie_scroll";
import {calculateAge} from "../../helper_functions/helper_functions";

function ApiActorDetails (props) {
    let actor = props.actor;
    let films = props.films.cast;
    const url_prefix = "http://image.tmdb.org/t/p/w500";
    const headshot = url_prefix + actor.profile_path

    console.log("actor in apiactordetails: ", actor)
    console.log('known fors in apiactordetails: ', films)

    return (
        <>
            <div className= 'row bg-color'>
                <div className= "col-3">
                    <ul type = "none">
                        <li>
                            <img src = {headshot} className = 'img-fluid m-1' />

                        </li>
                        <h4 className="m-1">Personal Information</h4>
                        <li className="m-3">
                            <b>Name</b>: {actor.name}

                        </li>
                        <li className="m-3">
                            <b>Gender</b>: {actor.gender}

                        </li>
                        <li className="m-3">
                            <b> Birthday</b>: {actor.birthday} ({calculateAge(actor.birthday)})

                        </li>
                        <li className="m-3">
                            <b>Place of Birth</b>: {actor.place_of_birth}

                        </li>
                    </ul>
                </div>
                <div className="col-9">
                    <h1>{actor.name}</h1>

                    <h5>Biography</h5>
                    <p>{actor.biography}</p>

                    <h5>Known For</h5>

                    <MovieScrollBar movies = {films}/>

                </div>
            </div>
        </>
    );

}
export default ApiActorDetails;
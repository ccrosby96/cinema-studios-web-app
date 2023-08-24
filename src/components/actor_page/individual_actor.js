
import {useParams} from "react-router";
import details from "./actor_top_details.json"
import movie_credits from "./actor_movie_credits.json"
import MovieScrollBar from "../home/movie_scroll";
import {calculateAge} from "../../helper_functions/helper_functions";

function ActorDetails () {
    const url_prefix = "http://image.tmdb.org/t/p/w500";
    const headshot = url_prefix + details.profile_path

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
                            <b>Name</b>: {details.name}

                        </li>
                        <li className="m-3">
                            <b>Gender</b>: {details.gender}

                        </li>
                        <li className="m-3">
                            <b> Birthday</b>: {details.birthday} ({calculateAge(details.birthday)})

                        </li>
                        <li className="m-3">
                            <b>Place of Birth</b>: {details.place_of_birth}

                        </li>





                    </ul>
                </div>
                <div className="col-9">
                    <h1>{details.name}</h1>

                    <h5>Biography</h5>
                    <p>{details.biography}</p>

                    <h5>Known For</h5>

                    <MovieScrollBar movies = {movie_credits.cast}/>


                </div>

            </div>

        </>
    );

}

export default ActorDetails;
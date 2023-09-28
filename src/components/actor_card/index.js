import style from "../../styles/actor-card.css"
import React from 'react';

function ActorCard({ actor }) {
    const url = "https://image.tmdb.org/t/p/w500";
    let headshot_url = actor.profile_path
        ? url + actor.profile_path
        : "https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg";

    let character = actor.character;
    let actor_name = actor.name;
    if ("roles" in actor) {
        character = actor.roles[0].character;
    }

    return (
        <div className="actor-card-container">
            <img
                src={headshot_url}
                alt="Not Found"
                className="rounded-3 img-fluid"
                style = {{height: "300px", objectFit: "cover"}}
            />
            <p className="title a1-font-16px mb-0 pb-0 white-font align-content-center">
                {actor_name}
            </p>
            <p className="card-text a1-font-16px mt-1 pt-0 white-font align-content-center">
                {character}
            </p>
        </div>
    );
}

export default ActorCard;

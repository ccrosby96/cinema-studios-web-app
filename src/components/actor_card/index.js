



function ActorCard(
    actor = {
        "adult": false,
        "gender": 1,
        "id": 1186659,
        "known_for_department": "Acting",
        "name": "Lily Sullivan",
        "original_name": "Lily Sullivan",
        "popularity": 38.545,
        "profile_path": "/sLjxpxV2JX8k3k9VWoIPrzqlh5J.jpg",
        "cast_id": 7,
        "character": "Beth",
        "credit_id": "60ae8f24955c6500573d01fb",
        "order": 0
    }
) {
    const url = "https://image.tmdb.org/t/p/w500";
    let headshot_url = url + actor.actor.profile_path;

    let character = actor.actor.character;
    let actor_name = actor.actor.name;
    if ("roles" in actor.actor) {
        character = actor.actor.roles[0].character;
    }
    const alt_actor = "https://www.pngall.com/wp-content/uploads/4/Brad-Pitt-PNG-File.png"

    return (

            <div className="scroll_media-element">
                <img
                    src= {headshot_url}
                    alt="Not Found"/>
                <p className="title a1-font-16px mb-0 pb-0 white-font align-content-center">{actor_name}</p>
                <p className="card-text a1-font-16px mt-1 pt-0 white-font align-content-center">{character}</p>
            </div>


    );
}

export default ActorCard;

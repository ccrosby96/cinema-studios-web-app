import ActorCard from "../actor_card";
import {Link} from "react-router-dom";


function ApiCastScrollBar(
    cast = [
        {
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
        },
        {
            "adult": false,
            "gender": 1,
            "id": 220620,
            "known_for_department": "Acting",
            "name": "Alyssa Sutherland",
            "original_name": "Alyssa Sutherland",
            "popularity": 20.579,
            "profile_path": "/femjkNZ7jTbcwz6LjoQQyRD5Mlc.jpg",
            "cast_id": 6,
            "character": "Ellie",
            "credit_id": "60ae8f1ac1ffbd0040c0de87",
            "order": 1
        }]

) {

    return (
        <>
            <div className="scroll_media-scroller snaps-inline">
                {
                    cast.cast.map((person, i) => {

                        return (
                            <Link to = {`/actors/actor/${person.id}`} className = "text-decoration-none">
                                <ActorCard actor={person}/>
                            </Link>
                        )
                    })
                }
            </div>

        </>
    );
}

export default ApiCastScrollBar;

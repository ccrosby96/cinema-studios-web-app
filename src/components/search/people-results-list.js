
import {Link} from "react-router-dom";
import PeopleListItem from "./people-list-item";

function PeopleResultsList (people = [
    {
        "adult": false,
        "id": 287,
        "name": "Brad Pitt",
        "original_name": "Brad Pitt",
        "media_type": "person",
        "popularity": 37.186,
        "gender": 2,
        "known_for_department": "Acting",
        "profile_path": "/cckcYc2v0yh1tc9QjRelptcOBko.jpg",
        "known_for": [
            {
                "adult": false,
                "backdrop_path": "/8pEnePgGyfUqj8Qa6d91OZQ6Aih.jpg",
                "id": 16869,
                "title": "Inglourious Basterds",
                "original_language": "en",
                "original_title": "Inglourious Basterds",
                "overview": "In Nazi-occupied France during World War II, a group of Jewish-American soldiers known as \"The Basterds\" are chosen specifically to spread fear throughout the Third Reich by scalping and brutally killing Nazis. The Basterds, lead by Lt. Aldo Raine soon cross paths with a French-Jewish teenage girl who runs a movie theater in Paris which is targeted by the soldiers.",
                "poster_path": "/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg",
                "media_type": "movie",
                "genre_ids": [
                    18,
                    53,
                    10752
                ],
                "popularity": 55.582,
                "release_date": "2009-08-19",
                "video": false,
                "vote_average": 8.214,
                "vote_count": 20686
            },
            {
                "adult": false,
                "backdrop_path": "/kg2FOT2Oe5PSCgs3L4vLel6B7ck.jpg",
                "id": 72190,
                "title": "World War Z",
                "original_language": "en",
                "original_title": "World War Z",
                "overview": "Life for former United Nations investigator Gerry Lane and his family seems content. Suddenly, the world is plagued by a mysterious infection turning whole human populations into rampaging mindless zombies. After barely escaping the chaos, Lane is persuaded to go on a mission to investigate this disease. What follows is a perilous trek around the world where Lane must brave horrific dangers and long odds to find answers before human civilization falls.",
                "poster_path": "/1SWBSYJsnyhdNRfLI1T6RsCxAQ4.jpg",
                "media_type": "movie",
                "genre_ids": [
                    28,
                    18,
                    27,
                    878,
                    53
                ],
                "popularity": 72.335,
                "release_date": "2013-06-20",
                "video": false,
                "vote_average": 6.807,
                "vote_count": 14367
            },
            {
                "adult": false,
                "backdrop_path": "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
                "id": 550,
                "title": "Fight Club",
                "original_language": "en",
                "original_title": "Fight Club",
                "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
                "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
                "media_type": "movie",
                "genre_ids": [
                    18
                ],
                "popularity": 68.25,
                "release_date": "1999-10-15",
                "video": false,
                "vote_average": 8.437,
                "vote_count": 27142
            }
        ]
    }
]) {
    const arr = people.people;
    if (arr.length === 0){
        return (<p className = "white-font"> No people found ヽ(゜～゜o)ノ</p>)
    }
    return (
        <>
            <ul className= "list-group no-bullets">
                {
                    arr.map((person, i) => {
                        return (
                            <Link to = {`/actors/actor/${person.id}`} className = "text-decoration-none">
                                <PeopleListItem person={person}/>
                            </Link>
                        )
                    })
                }
            </ul>

        </>
    );

}
export default PeopleResultsList;

import SeasonScrollTile from "./season-scroll-tile";

function SeasonsScrollResults(
    seasons = [
        {
            "air_date": "2013-04-24",
            "episode_count": 13,
            "id": 82137,
            "name": "Specials",
            "overview": "",
            "poster_path": null,
            "season_number": 0,
            "vote_average": 0
        },
        2,
        {
            "air_date": "2014-02-28",
            "episode_count": 13,
            "id": 51122,
            "name": "Season 2",
            "overview": "After being sworn in by Jack Crawford, the head of the FBI Behavioral Science Unit, to help capture a serial killer who is on the rampage, Will finds himself increasingly struggling to control his thought processes that inform his uncanny ability to empathise with serial killers. When damning evidence shows up at the FBI that implicates Will in a string of grisly murders he is immediately placed under the care of the Baltimore State Hospital for the Criminally Insane. As Will tries to assure Jack of his innocence he also attempts to convince him of the identity of the real killer.",
            "poster_path": "/fjSfJNUoFPigBngA1isQxPnzxrO.jpg",
            "season_number": 2,
            "vote_average": 8.4
        },
        {
            "air_date": "2015-06-04",
            "episode_count": 13,
            "id": 64757,
            "name": "Season 3",
            "overview": "After the shocking events of the Season 2 finale, Hannibal is on the run in Europe - accompanied by his psychiatrist Bedelia Du Maurier - sporting a new identity, but servicing the same insatiable appetite. As the lives of Will, Jack and Alana converge toward Hannibal again, each with their own motivations to catch him once and for all, their deadly dance turns in startling and unexpected ways.",
            "poster_path": "/rHS29GbV7Ffmn66Ewndgl791fja.jpg",
            "season_number": 3,
            "vote_average": 8
        }
    ]

) {

    return (
        <>
            <div className="scroll_media-scroller snaps-inline">
                {
                    seasons.seasons.map((season, i) => {

                        return (
                                <SeasonScrollTile season={season}/>
                        )
                    })
                }
            </div>

        </>
    );
}

export default SeasonsScrollResults;

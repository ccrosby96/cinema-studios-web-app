import {useEffect, useState} from "react";
import NavigationSidebar from "../navigation";
import {useParams} from "react-router";
import ApiActorDetails from "./api-actor-details";
import {findActorDetailsById, findActorKnownFilmsById} from "../../services/actor-service";
import {grabPersonGender} from "../../helper_functions/helper_functions";

function IndividualActorPage () {
    const aid = useParams();
    const actorId = aid.aid;
    console.log("actorId grabbed from url: ", actorId);
    const [details, setDetails] = useState(null);
    const [movies, setMovies] = useState(null);

    const [dataStatus,setDataStatus] = useState({
        details: false,
        films: false
    })
    const handleSetStatus = (property) => {
        setDataStatus((prevStatus) => ({
            ...prevStatus,
            [property]: true
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {

                const details = findActorDetailsById(actorId);
                const films = findActorKnownFilmsById(actorId);

                const grabDetails = async () => {
                    const a = await details;
                    setDetails(a)
                    handleSetStatus('details')
                    console.log(a);
                };
                const grabFilms = async () => {
                    const b = await films;
                    setMovies(b)
                    handleSetStatus('films')
                    console.log('known for films: ', b);
                }


                grabDetails();
                grabFilms();
                // console.log("logging details: ", details)
                // console.log("logging films: ", films)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // making calls to api service only once on initial mount

    // if still waiting for api request to be fulfilled display loading
    if (!dataStatus.details || !dataStatus.films) {
        return <div className="App">Loading...</div>;
    }
    // we can now render the actual page
    // pass these props down to actor details component for rendering
    let props = {
        actor: details,
        films: movies
    }
    console.log('actor page props', props)
   // <ImageText {...props} />

    return (
        <>
            <div className="row p-0 m-0">
                <NavigationSidebar/>

                <ApiActorDetails {...props}/>
            </div>

        </>

    );
}
export default IndividualActorPage;
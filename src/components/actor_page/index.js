import {useState} from "react";
import details from "./actor_top_details.json";
import movie_credits from "./actor_movie_credits.json";
import NavigationSidebar from "../navigation";
import {useParams, useLocation} from "react-router";
import ActorDetails from "./individual_actor";

function ActorPage () {
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const {pid} = useParams();
    console.log('pid in actor page: ',pid);
    console.log('path in ActorPage:', pathname);
    console.log(paths)

    return (
        <>
            <div className="row p-0 m-0">
                <NavigationSidebar/>


                <ActorDetails/>





            </div>

        </>

                    );
}

export default ActorPage;
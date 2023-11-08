import {useNavigate, useParams} from "react-router";
import {
    getFollowsPageByUsername,
} from "../../services/users-service";
import {useEffect, useState} from "react";
import ProfilePageBar from "./profile-page-bar";
import LoadingScreen from "./loading-profile";
import NavigationSidebar from "../navigation";
import FollowList from "../following-list/follow-list";
function ProfileFollows () {
    const {username} = useParams()
    const {page} = useParams()
    const [data,setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFollowsPageByUsername(username, page);
                setData(response)
                console.log('data: ', data);
            } catch (error) {
                // Handle errors here (e.g., display an error message)
                console.error("Error fetching profile:", error);
            }
        };
        fetchData();
    }, []);

    console.log(data);
    if (data === null) {
        return <LoadingScreen label={"Following"}/>
    }

    return (<div>
        <NavigationSidebar/>
        <div className = "container">
            <ProfilePageBar username = {data.username} profilePic={data.profilePic} section={"following"}/>
            <div className = "row">
                <div className = "col m-2">
                    {(
                        <FollowList follows={data.results}/>
                    )}
                </div>

            </div>
        </div>
    </div>)

}
export default ProfileFollows;
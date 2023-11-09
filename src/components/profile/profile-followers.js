import {useNavigate, useParams} from "react-router";
import {
    getFollowersPageByUsername,
} from "../../services/users-service";
import {useEffect, useState} from "react";
import ProfilePageBar from "./profile-page-bar";
import LoadingScreen from "./loading-profile";
import NavigationSidebar from "../navigation";
import FollowerList from "../follower-list/follower-list";
import PageButtons from "../page-buttons/page-buttons";
function ProfileFollowers () {
    const {username} = useParams()
    const {page} = useParams()
    const [data,setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFollowersPageByUsername(username, page);
                setData(response)
                console.log('data: ', data);
            } catch (error) {
                // Handle errors here (e.g., display an error message)
                console.error("Error fetching profile:", error);
            }
        };
        fetchData();
    }, []);

    const handleNavigatePage = (pageNumber) => {
        navigate(`/profile/${username}/followers/${pageNumber}`);
    };

    console.log(data);
    if (data === null) {
        return <LoadingScreen label={"Followers"}/>
    }

    return (<div>
        <NavigationSidebar/>
        <div className = "container">
            <ProfilePageBar username = {data.username} profilePic={data.profilePic} section={"followers"}/>
            <div className = "row">
                <div className = "col m-2">
                    {(
                        <FollowerList follows={data.results}/>
                    )}
                </div>

            </div>
            <div className = "row">
                <PageButtons handleNavigatePage={handleNavigatePage} currentPage={page} maxPage={data.maxPage}/>
            </div>
        </div>
    </div>)

}
export default ProfileFollowers;
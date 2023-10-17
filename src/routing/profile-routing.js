import {Route, Routes} from "react-router";
import ProfileSettings from "../components/profile/profile-settings";
import ProfileScreen from "../components/profile/profile-screen";
import ProfileReviews from "../components/profile/profile-reviews";
import ProfileWatchlist from "../components/profile/profile-watchlist";
import ProfileFavorites from "../components/profile/profile-favorites";
function ProfileRouting(){
    return (
        <Routes>
            <Route  path = {"/:username"} element = {<ProfileScreen/>}/>
            <Route index element = {<ProfileScreen/>}/>
            <Route path = {"/settings"} element = {<ProfileSettings/>}/>
            <Route path = {"/:username/reviews/"} element={<ProfileReviews/>}/>
            <Route path = {"/:username/watchlist"} element = {<ProfileWatchlist/>}/>
            <Route path = {"/:username/favorites"} element = {<ProfileFavorites/>}/>
        </Routes>
    )
}
export default ProfileRouting;
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/profile.css"
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk }
    from "../../thunks/users-thunks";
import NavigationSidebar from "../navigation";
import NoProfile from "./no-profile";
import MovieWatchList from "./movie-watch-list";
import FavoritesScrollBar from "../favorites";
function ProfileScreen() {
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const save = () => { dispatch(updateUserThunk(profile));};



    useEffect(() => {
        const fetchData = async () => {
            try {
                const { payload } = await dispatch(profileThunk());
                console.log("current profile", payload);
                setProfile(payload);

            } catch (error) {
                // Handle errors here (e.g., display an error message)
                console.error("Error fetching profile:", error);
            }
        };

        fetchData();
    }, []);
    // if not loggged in don't try and load profile
    if (!profile){
        console.log("no user profile loaded")
        //navigate("/login");
        return (
                <NoProfile/>
            );
    }
     return (
         <div className = "bg-landing-page m-0 p-0">
             <NavigationSidebar/>
         <div class="container rounded mt-3 mb-5 bg-dark">
             <div class="row">
                 <div class="col-md-3 border-right">
                     <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class=" mt-5 circle-container" src={profile.profilePic}/><span class="font-weight-bold white-font">{profile.username}</span><span> </span></div>
                 </div>
                 <div class="col-md-5 border-right">
                     <div class="p-3 py-5">
                         <div class="d-flex justify-content-between align-items-center mb-3">
                             <h4 class="text-right white-font">Profile Settings</h4>
                         </div>
                         <div class="row mt-2">
                             <div class="col-md-6"><label class="labels" className = "white-font">First Name</label><input type="text" className="form-control" placeholder="first name" value={profile.firstName} onChange={(event) => {
                                 const newProfile = {
                                     ...profile,
                                     firstName: event.target.value,
                                 };
                                 setProfile(newProfile);
                             }}
                             /></div>
                             <div class="col-md-6"><label class="labels" className = "white-font">Last Name</label><input type="text" className="form-control" value={profile.lastName} onChange = {(event)=>{
                             const newProfile = {
                                 ...profile,
                                 lastName: event.target.value,
                                 };
                                setProfile(newProfile);
                                }
                             } placeholder="last name"/></div>
                         </div>
                         <div class="row mt-3">

                             <div class="col-md-12"><label class="labels" className = "white-font">Email</label><input type="text" class="form-control" placeholder= {profile.email} value={profile.email}/></div>
                             <div className="col-md-12"><label className="labels white-font">Profile Pic Url</label><input type="text"
                                                                                                      className="form-control"
                                                                                                      placeholder={profile.profilePic}
                                                                                                      value={profile.profilePic}
                                                                                                      onChange = {(event)=> {
                                                                                                          const newProfile = {
                                                                                                              ...profile,
                                                                                                              profilePic: event.target.value,
                                                                                                          };
                                                                                                          setProfile(newProfile);}
                                                                                                      }
                             />
                             </div>


                         </div>
                         <div class="row mt-3">
                             <div class="col-md-6"><label class="labels" className = "white-font">Location</label><input type="text" class="form-control" placeholder={profile.location} value={profile.location} onChange={(event) => {
                                 const newProfile = {
                                     ...profile,
                                     location: event.target.value,
                                 };
                                 setProfile(newProfile);
                             }}
                             /></div>
                             <div class="col-md-6"><label class="labels" className = "white-font">Role</label><input type="text"
                                                                                            className="form-control"
                                                                                            placeholder=""
                                                                                            value={profile.role}/></div>


                             </div>
                         <button className = "btn btn-secondary profile-button mt-5 float-start" type = "button"
                                 onClick={() => {
                                     dispatch(logoutThunk());
                                     navigate("/login");
                                 }}>
                             Logout</button>
                         <div class="mt-5 text-center"><button class="btn btn-secondary profile-button float-end" type="button" onClick = {save}>Save Profile</button></div>

                     </div>

                 </div>
                 <div class="col-md-4">
                     <div class="p-3 py-5">
                         <div class="d-flex justify-content-between align-items-center experience"><h4 className = "white-font">Movie Watch List</h4></div><br></br>
                        <MovieWatchList movies = {currentUser.watchlist} profile = {profile}/>
                     </div>
                 </div>

             </div>
             <div className = "row">
                 <div className = "">
                     <h4 className = "white-font ms-2"> Favorites</h4>
                     <FavoritesScrollBar favorites={profile.favoriteMovies}/>
                 </div>
                 <div className = "">
                 </div>



             </div>


         </div>


</div>
);
}
export default ProfileScreen;



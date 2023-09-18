import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "../../styles/profile.css"
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk }
    from "../../thunks/users-thunks";
import NavigationSidebar from "../navigation";
import NoProfile from "./no-profile";
function ProfileScreen() {
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = () => { dispatch(updateUserThunk(profile)); };
    console.log(profile)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { payload } = await dispatch(profileThunk());
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
    console.log(currentUser)
     return (
         <>
             <NavigationSidebar/>
         <div class="container rounded bg-white mt-5 mb-5">
             <div class="row">
                 <div class="col-md-3 border-right">
                     <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5 circle-container" src={profile.profilePic}/><span class="font-weight-bold">{profile.firstName}</span><span class="text-black-50">{profile.email}</span><span> </span></div>
                 </div>
                 <div class="col-md-5 border-right">
                     <div class="p-3 py-5">
                         <div class="d-flex justify-content-between align-items-center mb-3">
                             <h4 class="text-right">Profile Settings</h4>
                         </div>
                         <div class="row mt-2">
                             <div class="col-md-6"><label class="labels">First Name</label><input type="text" class="form-control" placeholder="first name" value={profile.firstName} onChange={(event) => {
                                 const newProfile = {
                                     ...profile,
                                     firstName: event.target.value,
                                 };
                                 setProfile(newProfile);
                             }}
                             /></div>
                             <div class="col-md-6"><label class="labels">Last Name</label><input type="text" className="form-control" value={profile.lastName} onChange = {(event)=>{
                             const newProfile = {
                                 ...profile,
                                 lastName: event.target.value,
                                 };
                                setProfile(newProfile);
                                }
                             } placeholder="last name"/></div>
                         </div>
                         <div class="row mt-3">

                             <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control" placeholder= {profile.email} value={profile.email}/></div>
                             <div className="col-md-12"><label className="labels">Profile Pic Url</label><input type="text"
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
                             <div class="col-md-6"><label class="labels">Location</label><input type="text" class="form-control" placeholder={profile.location} value={profile.location} onChange={(event) => {
                                 const newProfile = {
                                     ...profile,
                                     location: event.target.value,
                                 };
                                 setProfile(newProfile);
                             }}
                             /></div>
                             <div class="col-md-6"><label class="labels">Role</label><input type="text"
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
                         <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" onClick = {save}>Save Profile</button></div>

                     </div>
                 </div>
                 <div class="col-md-4">
                     <div class="p-3 py-5">
                         <div class="d-flex justify-content-between align-items-center experience"><h4>Movie Watch List</h4></div><br></br>

                         <div class="col-md-12"><span>Then Nun II</span></div>
                         <div className="col-md-12"><span>The Shining</span></div>
                     </div>
                 </div>
             </div>
         </div>

</>
);
}
export default ProfileScreen;



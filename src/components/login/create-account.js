import {Link} from "react-router-dom";


import React, {useState} from "react";
import {useDispatch} from "react-redux";

import {createUserThunk }
    from "../../thunks/users-thunks";

import {useNavigate} from "react-router-dom";
import NavigationSidebar from "../navigation";

function CreateAccount() {
    const navigate = useNavigate();
    let [newUserEmail, setNewUserEmail] = useState('');
    let [newUserUsername, setNewUserUsername] = useState('');
    let [newUserPassword, setNewUserPassword] = useState('');
    let [newUserPasswordConfirm, setNewUserPasswordConfirm] = useState('');
    let [newUserFirstName, setNewUserFirstName] = useState('')
    let [newUserLastName, setNewUserLastName] = useState('')
    let [newUserFullName, setNewUserFullName] = useState('');
    let [newUserType, setNewUserType] = useState('user');
    const dispatch = useDispatch();


    const handleCreate = async (newUser) => {
        try {
            console.log("creating user with credentials: ", newUser);
            const logged = await dispatch(createUserThunk(newUser));
            if (logged.error) {
                throw new Error("User Creation Failed");
            }
            navigate("/home")
        } catch (e) {
            alert("UserName  Already Exists ");
        }
    };




    const newUserHandler = () => {
        const newUser = {
            email: newUserEmail,
            username: newUserUsername,
            password: newUserPassword,
            firstName: newUserFirstName,
            lastName: newUserLastName,
            role: newUserType,
        }

        if(newUserEmail === "" || newUserUsername === "" || newUserPassword === "" ||
            newUserFirstName === "" || newUserLastName === ""|| newUserType === "" ||
            newUserPasswordConfirm === "") {
            alert("Please fill out all fields")
        }
        else if (newUserPassword != newUserPasswordConfirm) {
            alert("Passwords do not match")
        }

        else {
            handleCreate(newUser);
        }
    }

    return (
        <div className = "mb-2 pb-2 sunset-background">
            <NavigationSidebar/>
        <div className="mt-2 pt-2 sunset-background w-100">
            <div className="center">
                <div className="center_box sunset-background rounded p-3">
                    <p className="fw-bold a1-font-family h4 text-center mt-2 text-white"> Create Account </p>
                    <form>

                        <div className="form-group mb-3">
                            <label className="fw-bold ms-2 a1-font-family h5 text-center mt-2 text-white"
                                   htmlFor="name">First Name</label>
                            <div className="me-2 ms-2">
                                <input type="name" className="me-3 rounded-pill form-control text-dark" id="name"
                                       onChange={(event) => setNewUserFirstName(event.target.value)}
                                       placeholder="Enter Name"
                                />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label className="fw-bold ms-2 a1-font-family h5 text-center mt-2 text-white"
                                   htmlFor="name">Last Name</label>
                            <div className="me-2 ms-2">
                                <input type="name" className="me-3 rounded-pill form-control text-dark" id="name"
                                       onChange={(event) => setNewUserLastName(event.target.value)}
                                       placeholder="Enter Name"
                                />
                            </div>
                        </div>


                        <div className="form-group mb-3">
                            <label className="fw-bold ms-2 a1-font-family h5 text-center mt-2 text-white"
                                   htmlFor="email">Enter Email</label>
                            <div className="me-2 ms-2">
                                <input type="email" className="me-3 rounded-pill form-control text-dark" id="email"
                                       placeholder="Enter Email"
                                       onChange={(event) => setNewUserEmail(event.target.value)} />
                            </div>
                        </div>


                        <div className="form-group mb-3">
                            <label className="fw-bold ms-2 a1-font-family h5 text-center mt-2 text-white"
                                   htmlFor="username">Enter Username</label>
                            <div className="me-2 ms-2">
                                <input className="rounded-pill form-control text-dark" id="username"
                                       placeholder="Enter username"
                                       onChange={(event) => setNewUserUsername(event.target.value)}
                                />
                            </div>
                        </div>


                        <div className="form-group mb-3">
                            <label className="fw-bold ms-2 a1-font-family h5 text-center mt-2 text-white"
                                   htmlFor="password_initial">Enter Password</label>
                            <div className="me-2 ms-2">
                                <input type="password" className="me-3 rounded-pill form-control text-dark" id="password_initial"
                                       placeholder="Enter password"
                                       onChange={(event) => setNewUserPassword(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label className="fw-bold ms-2 a1-font-family h5 text-center mt-2 text-white"
                                   htmlFor="password_confirm">Confirm Password</label>
                            <div className="me-2 ms-2">
                                <input type="password" className="me-3 rounded-pill form-control text-dark" id="password_confirm"
                                       placeholder="Confirm password"
                                       onChange={(event) => setNewUserPasswordConfirm(event.target.value)}
                                />
                            </div>
                        </div>



                        <div className="form-group mb-3">
                            <label className="fw-bold ms-2 a1-font-family h5 text-center mt-2 text-white"
                                   htmlFor="user_type">Select Profile Type</label>
                            <div className="me-2 ms-2">
                                <select id="user_type" className="me-3 rounded-pill form-control text-dark w-50"
                                        onChange={(event) => setNewUserType(event.target.value)}>
                                    <option defaultValue  value="user">User</option>

                                </select>
                            </div>
                        </div>

                        <div className="form-group mb-3 d-flex justify-content-center">
                            <Link to="/login"><button className="btn rounded-pill btn-primary me-3"> Cancel</button></Link>
                            <button type="button" className="btn rounded-pill btn-primary ms-3"
                                    onClick={() => newUserHandler()} >
                                Create Account
                            </button>
                        </div>

                    </form>
                    <form>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
}
export default CreateAccount;
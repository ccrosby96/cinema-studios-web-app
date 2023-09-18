import {Link} from "react-router-dom";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk, logoutThunk} from "../../thunks/users-thunks";
import NavigationSidebar from "../navigation";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        console.log("handleLogin: ",username, password)
        try {
            const logged = await dispatch(loginThunk({ username, password }));
            if (logged.error) {
                alert("Login failed");
            } else {
                navigate("/profile");
            }
        } catch (e) {
            alert(e);
        }
    };


    return (
        <div className = "row p-0 m-0 sunset-background">
            <NavigationSidebar/>
        <div className=" w-100">
            <div className="center">
                <div className="center_box sunset-background rounded p-3">
                    <p className="text-white fw-bold a1-font-family h3 text-center mt-2"> Login </p>
                    <form>
                        <div className="form-group mb-3">
                            <label className="text-white fw-bold ms-2 a1-font-family h5 text-center mt-2"
                                   htmlFor="username">Username</label>
                            <div className="me-2 ms-2">
                                <input className="me-3 rounded-pill form-control" id="username"
                                       placeholder="Enter username"
                                       onChange={(event) => setUsername(event.target.value)}/>
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label className="text-white fw-bold ms-2 a1-font-family h5 text-center mt-2"
                                   htmlFor="password">Password</label>
                            <div className="me-2 ms-2">
                                <input type="password" className="me-3 rounded-pill form-control" id="password"
                                       placeholder="Enter password"
                                       onChange={(event) => setPassword(event.target.value)}/>
                            </div>
                        </div>

                        <div className="form-group mb-3 d-flex justify-content-center">
                            <button className="btn rounded-pill btn-primary me-3"
                                    type="button"
                                    onClick={handleLogin}>
                                Login
                            </button>
                            <Link to="/create_account"><button className="btn rounded-pill btn-primary ms-3"> Create Account</button></Link>
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
export default Login;
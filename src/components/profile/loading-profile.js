import  "../../styles/no-profile.css"
import NavigationSidebar from "../navigation";
import popcornImage from '../../images/popcorn.png';

function LoadingScreen ({label}){
    return (
        <div className = "m-0 p-0 bg-dark mb-0 ">
            <div className="no-profile-center-container">
                <div className="centered-content">
                    <h5 className="centered-text white-font">Loading {label} Just a Sec!</h5>
                </div>
            </div>
        </div>
    );


}
export default LoadingScreen;
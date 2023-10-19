import  "../../styles/no-profile.css"
import NavigationSidebar from "../navigation";
import popcornImage from '../../images/popcorn.png';

function NoProfile (){
    return (
            <div className = "m-0 p-0 bg-dark mb-0 ">
                <NavigationSidebar />
                <div className="no-profile-center-container">
                    <div className="centered-content">
                        <h5 className="centered-text white-font ms-5 mb-3">It looks like nobody is logged in yet ...</h5>
                        <img
                            src= {popcornImage}
                            alt="Your Image"
                            className = "rounded-3"
                        />
                    </div>
                </div>
            </div>
    );


}
export default NoProfile;
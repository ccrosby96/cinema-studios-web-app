import  "../../styles/no-profile.css"
import NavigationSidebar from "../navigation";

function NoProfile (){
    return (
            <div className = "m-0 p-0 bg-dark mb-0 ">
                <NavigationSidebar />
                <div className="no-profile-center-container">
                    <div className="centered-content">
                        <h5 className="centered-text white-font">It looks like nobody is logged in yet ...</h5>
                        <img
                            src="https://image-cdn.neatoshop.com/styleimg/89230/none/navy/default/422686-20;1562795466y.jpg"
                            alt="Your Image"
                            className = "rounded-3"
                        />
                    </div>
                </div>
            </div>
    );


}
export default NoProfile;
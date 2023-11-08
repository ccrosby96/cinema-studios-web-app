import FollowerListItem from "./follower-list-item";
import React from "react";
function FollowerList ({follows}) {
    // render a list of people that follow the individual

    if (follows === null || follows.length === 0) {
        return (<p className={"white-font"} >Not Following Anyone</p> )
    }
    return (
        <div className = "container">
            <div className = "row">
                <ul className="list-group no-bullets bg-dark">
                    {follows.map((follow, i) => (
                        <FollowerListItem data={follow}/>
                    ))}
                </ul>
            </div>
        </div>

    )
}
export default FollowerList;
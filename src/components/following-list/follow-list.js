import FollowListItem from "./follow-list-item";
import React from "react";
import PageButtons from "../page-buttons/page-buttons";
function FollowList ({follows}) {

    if (follows === null || follows.length === 0) {
        return (<p className={"white-font"} >Not Following Anyone</p> )
    }
    console.log(follows);
    return (
        <div className = "container">
            <div className = "row">
                <ul className="list-group no-bullets bg-dark">
                    {follows.map((follow, i) => (
                        <FollowListItem data={follow}/>
                    ))}
                </ul>
            </div>
            <div className = "row">

            </div>
        </div>

    )
}
export default FollowList;
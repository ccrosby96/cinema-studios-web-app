import { Link } from "react-router-dom";

function FollowListItem({ data }) {
    return (
        <div className="list-group-item bg-dark d-flex align-items-center">
            <Link className="text-decoration-none" to={`/profile/${data.following.username}`}>
                <div>
                    <img
                        className="follow-item m-1"
                        src={data.following.profilePic}
                        alt=""
                    />
                </div>
            </Link>
            <div className="ms-2">
                <span className="white-font">{data.following.username}</span>
            </div>
        </div>
    );
}

export default FollowListItem;

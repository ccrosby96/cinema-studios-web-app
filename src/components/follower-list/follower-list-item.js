import { Link } from "react-router-dom";


function FollowerListItem({ data }) {
    return (
        <div className="list-group-item bg-dark d-flex align-items-center">
            <Link className="text-decoration-none" to={`/profile/${data.follower.username}`}>
                <div>
                    <img
                        className="follow-item m-1"
                        src={data.follower.profilePic}
                        alt=""
                    />
                </div>
            </Link>
            <div className="ms-2">
                <span className="white-font">{data.follower.username}</span>
            </div>
        </div>
    );
}

export default FollowerListItem;

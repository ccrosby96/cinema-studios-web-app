import { Link } from "react-router-dom";

function FollowingGrid({ data }) {
    if (!data || data.length === 0) {
        return <></>;
    }

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-4 g-4 m-0 p-0">
                {data.map((follow, index) => (
                    <div key={index} className="col m-0 p-0">
                        <Link className="text-decoration-none" to={`/profile/${follow.following.username}`}>
                            <div className = "">
                                <img
                                    className="follow-item "
                                    src={follow.following.profilePic}
                                    alt={follow.following.username}

                                />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FollowingGrid;

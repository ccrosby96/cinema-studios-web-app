import { Link } from "react-router-dom";

function FollowingGrid({ data }) {
    if (!data || data.length === 0) {
        return <></>;
    }

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {data.map((follow, index) => (
                    <div key={index} className="col">
                        <Link className="text-decoration-none" to={`/profile/${follow.following.username}`}>
                            <div className = "ms-0 me-0">
                                <img
                                    className=" rounded-2 mt-0 follow-item ms-0 me-0"
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

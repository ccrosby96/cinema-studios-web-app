import {useSelector} from "react-redux";

function ConversationItem({ message }) {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className={message.role === "assistant" ? "list-group-item bg-dark mb-1 rounded-2 border-1" : "list-group-item bg-secondary mb-1 rounded-2 border-1"}>
            <div className="container">
                <div className="row">
                        <div className="d-flex">

                            {currentUser && message.role === "user" && (
                                <img
                                    className="follow-item me-3"
                                    src={currentUser.profilePic}
                                    alt=""
                                />
                            )}

                            {!currentUser && message.role === "user" && (
                                // Render something else or a default image for users when no user is logged in
                                <img
                                    className="follow-item me-3"
                                    src="https://i.pngimg.me/thumb/f/720/64991c84d9.jpg"
                                    alt=""
                                />
                            )}

                            {message.role === "assistant" && (
                                // Render something specific for the assistant role
                                <img
                                    className="follow-item me-3"
                                    src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/14202/production/_108243428_gettyimages-871148930.jpg"
                                    alt=""
                                />
                            )}

                            <div className="review-body-container">
                                <p className="white-font ms-3" style={{ wordWrap: 'break-word' }}>
                                    {message.content}
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationItem;

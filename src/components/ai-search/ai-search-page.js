import React, {useEffect, useState} from 'react';
import NavigationSidebar from "../navigation";
import ConversationItem from "./conversation-item";
import {useDispatch, useSelector} from "react-redux";
import {profileThunk} from "../../thunks/users-thunks";
import {aiSearchPostMessage} from "../../services/ai-search-service";
import loadingGif from '../../images/loading.gif';
import magnifyGif from "../../images/magnify.gif";
import {findMovieDetailsByTitle, fetchMovieDetailsFromSuggestions} from "../../services/movie-service";
import {setSearchResults} from "../../thunks/ai-thunks";
import RecommendationsScrollBar from "../recommendations";
import AiResultsDisplay from "./ai-results-display";
import {toastNotification, toastInfoMessage, grabSuggestionsFromAIResponse} from "../../helper_functions/helper_functions";

const AiSearchPage = () => {
    const [userInput, setUserInput] = useState('');
    const [conversationHistory, setConversationHistory] = useState([])
    const { results } = useSelector((state) => state.aiSearchResults);
    const { currentUser } = useSelector((state) => state.user);
    const [loggedinUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resultsLoading, setResultsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState("");
    const [movieData, setMovieData] = useState(null);
    const dispatch = useDispatch();
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // this is really important somehow for making user appear logged in...
                const {loggedUser} = await dispatch(profileThunk())
                setLoggedInUser(loggedUser)

            } catch (error) {
                // Handle errors here (e.g., display an error message)
                console.error("Error fetching profile:", error);
            }
        };

        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);  // Empty dependency array ensures it only runs once, similar to componentDidMount
    const handleKeyPress = (event) => {
        // You can handle key presses, e.g., Enter key to submit the input
        if (event.key === 'Enter') {
             askAI();
        }
    };
    const clearConversation  = () => {
        setConversationHistory([])
    }
    const checkForTitle = async (message) => {
        const pattern = /"([^"]*)"/;
        // extract movie title/year pairs from ai response
        const movieMatches = grabSuggestionsFromAIResponse(message);
        // Find the first match of the pattern in the message
        const match = message.match(pattern);
        // Extracted movie title (assuming there's only one title in the message)
        const movieTitle = match ? match[1] : null;
        if (movieMatches.length > 0){
            const requestObject = {
                suggestions: movieMatches
            }
            // search for matches from TMDB, set loading to true
            setResultsLoading(true);
            const response = await dispatch(setSearchResults(requestObject))

            console.log('Data:', response.payload);
            if (response) {
                console.log('got a response from server for multiple titles', response);
                setMovieData(response.payload);
            }
            setResultsLoading(false);
        }
         else {
            console.log('No movie title found in the message.');
        }
    }
    const askAI = async () => {
        if (userInput === "" || userInput === null){
            toastInfoMessage("Type Something First I Can't Read Minds");
            return;
        }
        try {

            const newMessage = [{role: 'user', content: userInput}];
            setUserInput('');

            // we'll pass this to the api endpoint
            const conversation = [...conversationHistory, ...newMessage]
            // can set it for front end too
            setConversationHistory([...conversation])
            const request = {
                conversation: conversation
            }
            setLoading(true);
            const response = await aiSearchPostMessage(request);

            if (response.success){
                // if we got a good response back update conversation
                const aiMessage = {role: "assistant", content: response.message}
                setConversationHistory([...conversation, aiMessage]);
                // let's parse the message for a potential suggestion
                await checkForTitle(response.message);
            }
        }catch (error){
            console.error(error.message)
        }
        setLoading(false);

    }

    const handleSearch = () => {
        // Perform actions with the user input, like making an API call to your GPT model
        askAI();
    };
    console.log(movieData)
    console.log('cached data in redux for ai results', results);
    return (
        <>
            <NavigationSidebar/>
            <div className = "container">
                    <div className = "row">
                        <div className = "col-2"> </div>
                        <div className = "col-9">
                                <ul className = "list-group no-bullets  m-3">
                                    {conversationHistory.slice(-4).map((message, index) => (
                                        <ConversationItem key={index} message={message} />
                                    ))}


                                </ul>
                        </div>
                        <div className = "col-2"> </div>

                    </div>
                    <div className = "row">
                        <div className = "col-2"> </div>
                        <div className="col-8 d-flex flex-row align-items-center">
                            <button className="btn btn-secondary me-2" onClick={clearConversation}>
                                Clear
                            </button>
                            <input
                                type="text"
                                value={userInput}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your movie query..."
                                className="white-font form-control flex-grow-1"
                            />
                            <button className="btn btn-secondary ms-2" onClick={handleSearch}>
                                Search
                            </button>
                        </div>

                        <div className = 'col-2'>
                            {loading && (
                                <img src = {loadingGif}
                                     style = {{height: "50px", width: "50px"}}
                                    className = "rounded-2"/>
                            )}

                        </div>
                    </div>
                    <div className = "row mt-3" >
                        {resultsLoading ? (
                            // Render loading indicator
                            <div className="d-flex align-items-center justify-content-center">
                                <img
                                    src={magnifyGif}
                                    style={{ height: "100px", width: "100px" }}
                                    className="rounded-2"
                                    alt="Loading"
                                />
                            </div>
                        ) : (
                            // Check if movieData is not null or undefined before rendering results
                            Object.keys(results).length > 0 ? (
                                <AiResultsDisplay resultsDict={results} />
                            ) : (
                                <></>
                            )
                        )}

                    </div>
            </div>
        </>

    );
};
export default AiSearchPage;

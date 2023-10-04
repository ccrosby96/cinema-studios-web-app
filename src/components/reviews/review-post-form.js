import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Slider from "../rating_scroll_bar/scrollable_bar";

import { createMovieReview } from "../../services/movie-review-service";
import MovieReviewItemSubmission from "./review-item-submission";
import MovieReviewItem from "./movie-review";

const ReviewPostForm = ({ user, movieId }) => {
    let [reviewBody, setReviewBody] = useState("");
    const { currentUser } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const [reviewScore, setReviewScore] = useState(5);
    const [generatedReview, setGeneratedReview] = useState(null);
    const [spoilers, setSpoilers] = useState(false);

    const ReviewClickHandler = async () => {
        if (currentUser) {
            console.log("this post is being written by", currentUser.username);
            const newReview = generateMovieReview();
            try {
                const generateReview = await createMovieReview(newReview);
                if (generateReview) {
                    setGeneratedReview(generateReview);

                }

            } catch (error) {
                // Handle errors here (e.g., display an error message)
                console.error("Error creating review", error);
            }
        }
    };
    const spoilersClickHandler = () => {
       setSpoilers(!spoilers);
    }

    // Function to generate a movie review object
    const generateMovieReview = () => {
        let newReview = {
            author: currentUser._id,
            rating: parseFloat(reviewScore),
            movieId: parseInt(movieId),
            body: reviewBody,
            containsSpoilers: spoilers,
        };
        return newReview;
    };

    const handleSliderChange = (e) => {
        setReviewScore(e.target.value);
        console.log("set moviereview score to ", reviewScore);
    };

    return (
        <>
            {generatedReview ? (
                <MovieReviewItem review={generatedReview} />
            ) : (
                <div className="bg-dark rounded-3">
                    <br></br>
                    <div className="row">
                        <div className="col-auto">
                            <img
                                className="review-profile-pic ps-1"
                                src={user.profilePic}
                                width={100}
                                height={100}
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="col-10">
              <textarea
                  value={reviewBody}
                  placeholder="Write Review Here!"
                  className="form-control border-0 white-font"
                  maxLength="2000"
                  style={{ minHeight: "100px", height: "auto" }}
                  onChange={(event) => setReviewBody(event.target.value)}
              ></textarea>
                            <span className = "white-font">{reviewBody.length} / 2000</span>

                            <div>
                                <Slider
                                    className="float-start m-0 p-0"
                                    value={reviewScore}
                                    max={10}
                                    step={0.5}
                                    onChange={handleSliderChange}
                                />

                                <i className="fa-solid fa-star color-yellow me-1"></i>
                                <span className="fw-bold white-font">{reviewScore} / 10 </span>
                                <label className="white-font ms-3 form-check-label">
                                    Spoilers
                                    <input
                                        type="checkbox"
                                        checked={spoilers}
                                        onChange={spoilersClickHandler}
                                        className="white-font ms-2 m-0 nudge-down form-check-input"
                                    />
                                </label>

                                <button
                                    className="rounded-pill btn btn-primary float-end mt-0 ps-3 pe-3 fw-bold nudge-up"
                                    onClick={ReviewClickHandler}
                                >
                                    Post Review
                                </button>
                                <div className="text-primary fs-2">
                                    <i className="bi bi-card-image me-3"></i>
                                    <i className="bi bi-filetype-gif me-3"></i>
                                    <i className="bi bi-bar-chart me-3"></i>
                                    <i className="bi bi-emoji-smile me-3"></i>
                                    <i className="bi bi-geo-alt"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <hr />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default ReviewPostForm;

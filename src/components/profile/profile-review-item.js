import React, { useState } from 'react';
import {Link} from "react-router-dom";
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'
TimeAgo.addDefaultLocale(en)

function ProfileReviewItem({ review }) {
    const movieId = review.movieId.toString();
    let posterPic = review.posterPic || '';
    const title = review.movieTitle || '';
    const url = 'https://image.tmdb.org/t/p/w500';
    const body = review.body;
    const dateReviewed = review.createdAt;
    const [showFullText, setShowFullText] = useState(false);
    const timeAgo = new TimeAgo('en-US')

    if (posterPic === '') {
        posterPic =
            'https://media.istockphoto.com/id/1039351052/vector/movie-and-film-festival-poster-template-design-modern-retro-vintage-style.jpg?s=612x612&w=0&k=20&c=aPVSLX7VlJj7DYBZ8afyj9ca15qoZEeZkLj_1exaUfE=';
    } else {
        posterPic = url + posterPic;
    }

    if (review === null) {
        return <></>;
    }

    // Adjust the number of characters to display before truncating
    const truncatedLength = 200;

    return (
        <div className="list-group-item p-0 bg-dark border-secondary-subtle rounded-3 m-1">
            <div className="row">
                <div className="col-2">
                    <Link to={`/movies/movie/${movieId}`} className="text-decoration-none m-0 p-0">
                        <img
                            className="card-img rounded-3 img-fluid m-0 p-0"
                            src={posterPic}
                            alt="Image Not Found"
                        />
                    </Link>
                </div>
                <div className="col-10 m-0 p-0">
                    <div className="m-0 p-0">
                        <h5 className="mb-0 pb-0 white-font">{title}</h5>
                        <span className="grey-text mt-0 pt-0">Reviewed {timeAgo.format(new Date(dateReviewed))}</span>
                        <p className="p-0 m-0 ps-1 wd-font-family-arial text-nowrap d-inline white-font">
                            &nbsp; {review.rating} <i className="fa-solid fa-star color-yellow"></i>
                            <span className="grey-text ms-3">{review.likes} likes</span>
                        </p>
                        {body.length > truncatedLength && !showFullText ? (
                            <>
                                <p className="white-font">{`${body.slice(0, truncatedLength)} ...`}</p>
                                <button
                                    className="btn p-0 m-0 text-secondary"
                                    onClick={() => setShowFullText(true)}
                                >
                                    <span className="white-font read-more"> Read more</span>
                                </button>
                            </>
                        ) : (
                            <p className="white-font">{body}</p>
                        )}
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileReviewItem;

import languageMap from "./languages-dictionary.json"
import {toast} from "react-toastify";

// server base api
const CLIENT_URL = process.env.REACT_APP_CLIENT_BASE_URL;
const videoBaseUrls = {
    "YouTube" : "https://www.youtube.com/watch?v=",
    "Vimeo" : "Vimeo: https://vimeo.com/"
}
function toastNotification (message) {
    toast.success(message, {
        position: 'top-right',
        autoClose: 3000, // Notification will close after 3 seconds
        hideProgressBar: false, // Show a progress bar
        closeOnClick: true, // Close the notification when clicked
        pauseOnHover: true, // Pause the timer on hover
        draggable: true, // Allow dragging the notification
        style: {
            background: 'rgba(52, 58, 64, 1)',
            color: "white",
        },
    });
}
function toastInfoMessage (message) {
    toast.info(message, {
        position: 'top-center',
        autoClose: 3000, // Notification will close after 3 seconds
        hideProgressBar: false, // Show a progress bar
        closeOnClick: true, // Close the notification when clicked
        pauseOnHover: true, // Pause the timer on hover
        draggable: true, // Allow dragging the notification
        style: {
            background: 'rgba(52, 58, 64, 1)',
            color: "white",
        },
    });
}
function grabGenres(arr) {

    const nameArray = arr.map(obj => obj.name);
    const combinedNames = nameArray.join(", ");
    return combinedNames;
}

function grabRuntime (minutes) {
    let res = "";
    const hours = Math.floor(minutes / 60); // Get the whole number of hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes

    res += hours.toString() + 'h'
    res += " " + remainingMinutes + 'm'
    return res
}
function grabOriginalLanguage(movie) {
    let abrev = movie.movie.original_language;
    let languages = movie.movie.spoken_languages;
    for (const obj of languages){
        if (obj.iso_639_1 === abrev) {
            return obj.name
        }
    }
    return abrev
}
function extractOriginalLanguage(movie) {
    let abrev = movie.original_language;
    let languages = movie.spoken_languages;
    for (const obj of languages){
        if (obj.iso_639_1 === abrev) {
            return obj.name
        }
    }
    return abrev

}
function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const currentMonth = currentDate.getMonth();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function formatDate(inputDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(inputDate);
    return date.toLocaleDateString(undefined, options);
}
function formatReviewDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
function grabSeriesCreators(data) {
    const creatorNames = data.map(creator => creator.name);

    const formattedNames = creatorNames.join(', ');
    return formattedNames;
}
function convertScoreToPercent(score) {
    const floatVal = parseFloat(score);
    const percentVal = floatVal * 10;
    const rounded = Math.round(percentVal);
    return rounded.toString();
}
function generateImageUrl(url) {
    const imageUrl = "http://image.tmdb.org/t/p/w500";
    const full = imageUrl + url;
    return full;
}
function extractLanguageName(code) {
    const name = languageMap[code];
    return name;

}
function generateTrailerUrl(trailers) {
    for (const obj of trailers) {
        if (obj.site === "YouTube"){
            return videoBaseUrls[obj.site] + obj.key
        }
        else if (obj.site === "Vimeo"){
            return videoBaseUrls[obj.site] + obj.key
        }
    }
    // no trailers from YouTube or Vimeo
    return ""
}
function grabPersonGender(num){
    if (num === 1) {
        return "Female"
    }
    else if (num === 2){
        return "Male"
    }
    else if (num === 3){
        return "Non-Binary"
    }
    return "Not specified"
}
function extractMovieCertification(details) {
    const productionCountries = details.production_countries
     if (productionCountries.length === 0){
         return ""
     }
    const prodCountry = details.production_countries[0].iso_3166_1;

    // now iterate over release dates
    const releaseDates = details.release_dates.results;
    for (const release of releaseDates) {
        if (release.iso_3166_1 === "US") {
            for (const item of release.release_dates){
                if (item.type === 1 || item.type === 2 || item.type === 3 ){
                    if (item.certification !== ""){
                        return item.certification
                    }
                }
            }
        }
    }
    return "None";
}
function extractSeriesNetworkData(details) {
    const arr = details.networks;
    if (arr.length === 0){
        return {name: "No Network Yet",
                logo: ""}
    }
    const data = arr[0];
    return  {name: data.name,
             logo: data.logo_path
            }
}
function truncateString(inputString, maxLength) {
    if (inputString.length > maxLength) {
        return inputString.substring(0, maxLength);
    } else {
        return inputString;
    }
}
function getDirectors(arr) {
    // Filter the array to find objects with "known_for_department" as "Directing"
    const directingDirectors = arr
        .filter((item) => item.known_for_department === 'Directing')
        .slice(0, 3);
    // Map the names of directors and join them into a comma-separated string
    return directingDirectors;
}
function generateReviewShareLink(review) {
    const reviewId = review._id.toString();
    let url = `${CLIENT_URL}/reviews/${reviewId}`;
    return url
}
function grabSuggestionsFromAIResponse(response){
    const pattern = /"([^"]+)" \((\d{4})\)/g;
// Initialize an array to store matches
    const matches = [];

// Find all matches of the pattern in the response
    let match;
    while ((match = pattern.exec(response)) !== null) {
        const movieTitle = match[1];
        const releaseYear = match[2];
        matches.push({ movieTitle, releaseYear });
    }
// Output the extracted movie title-year pairs
    console.log(matches);
    return matches
}

export {grabGenres, grabRuntime, grabOriginalLanguage, calculateAge,
    extractOriginalLanguage, formatDate, grabSeriesCreators, convertScoreToPercent,
    generateImageUrl, extractLanguageName,
    generateTrailerUrl, grabPersonGender, extractMovieCertification,
    extractSeriesNetworkData, formatReviewDate, truncateString
    , getDirectors, generateReviewShareLink, toastNotification, toastInfoMessage,
    grabSuggestionsFromAIResponse}
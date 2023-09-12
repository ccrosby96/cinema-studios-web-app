import languageMap from "./languages-dictionary.json"

const videoBaseUrls = {
    "YouTube" : "https://www.youtube.com/watch?v=",
    "Vimeo" : "Vimeo: https://vimeo.com/"
}
function grabGenres(arr) {
    let s = "";
    for (const obj of arr) {

        s = s + obj.name + " ";
    }
    return s
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
    console.log('trailers data in genTrailerurl', trailers);
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
    const prodCountry = details.production_countries[0].iso_3166_1;
    console.log('country found in movie details', prodCountry);

    // now iterate over release dates
    const releaseDates = details.release_dates.results;
    for (const release of releaseDates) {
        if (release.iso_3166_1 === "US") {
            for (const item of release.release_dates){
                if (item.type === 1 || item.type === 2 || item.type === 3){
                    return item.certification
                }
            }
        }
    }
    return "None";
}
export {grabGenres, grabRuntime, grabOriginalLanguage, calculateAge,
    extractOriginalLanguage, formatDate, grabSeriesCreators, convertScoreToPercent,
    generateImageUrl, extractLanguageName,
    generateTrailerUrl, grabPersonGender, extractMovieCertification}

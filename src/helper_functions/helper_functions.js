import languageMap from "./languages-dictionary.json"
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
export {grabGenres, grabRuntime, grabOriginalLanguage, calculateAge,
    extractOriginalLanguage, formatDate, grabSeriesCreators, convertScoreToPercent, generateImageUrl, extractLanguageName}


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

export {grabGenres, grabRuntime, grabOriginalLanguage}

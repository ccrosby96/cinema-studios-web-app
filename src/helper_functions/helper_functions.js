
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

export {grabGenres, grabRuntime, grabOriginalLanguage, calculateAge, extractOriginalLanguage}

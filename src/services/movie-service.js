import axios from "axios";
const Movies_URL = "http://localhost:4000/api/movie"


const api = axios.create({
    withCredentials: false,
});


export const findMovieDetailsById = async (mid) => {
    const response  = await api.get(`${Movies_URL}/details/${mid}`)
    console.log("are we getting here? line 12 findmoviedetails service function")
    const ret = response.data
    console.log("findmoviebyId ret val", ret)
    return ret
}

export const findMovieCastById = async (mid) => {
    const response = await api.get(`${Movies_URL}/cast/${mid}`)
    const ret = response.data
    return ret
}
export const findMovieProvidersById = async (mid) => {
    const response = await api.get(`${Movies_URL}/providers/${mid}`)
    const ret = response.data
    return ret
}
export const findMovieRecommendationsById = async (mid) => {
    const response = await api.get(`${Movies_URL}/recommendations/${mid}`)
    const ret = response.data
    return ret
}
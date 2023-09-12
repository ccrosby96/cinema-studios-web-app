import axios from "axios";
const Tv_URL = "http://localhost:4000/api/tv"

const api = axios.create({
    withCredentials: false,
});

export const fetchSeriesCastById = async (sid) => {
    const response = await api.get(`${Tv_URL}/${sid}/cast`)
    const ret = response.data;
    return ret
}
export const fetchSeriesDetailsById = async (sid) => {
    console.log("sid in fetchSeriesDetails Service: ", sid)
    const response  = await api.get(`${Tv_URL}/${sid}`)
    const ret = response.data
    return ret
}
export const fetchSeriesRecommendationsById = async (sid) => {
    console.log("sid in fetchSeriesRecs Service: ", sid)
    const response  = await api.get(`${Tv_URL}/${sid}/recommendations`)
    const ret = response.data
    return ret
}
export const findSeriesSeasonDetails = async (sid,seasonNumber) => {
    const response = await api.get(`${Tv_URL}/${sid}/season/${seasonNumber}`)
    const ret = response.data
    return ret
}
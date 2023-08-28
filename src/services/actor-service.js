import axios from "axios";
const Actors_URL = "http://localhost:4000/api/actors"


const api = axios.create({
    withCredentials: false,
});


export const findActorDetailsById = async (aid) => {
    const url = Actors_URL +'/' + aid + '/details';
    console.log("calling findActorDetailsById Actor-service!", url);
    const response  = await api.get(`${Actors_URL}/${aid}/details`)

    const ret = response.data
    return ret
}

export const findActorKnownFilmsById = async (aid) => {
    const url = Actors_URL +'/' + aid + '/movie_credits';
    console.log("calling findActorKnownFilmsById Actor-service!", url);
    const response  = await api.get(`${Actors_URL}/${aid}/movie_credits`)

    const ret = response.data
    return ret
}

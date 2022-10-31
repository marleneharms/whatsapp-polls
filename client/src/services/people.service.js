import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/people";

const getAllPeople = () => {
    return axios.get(API_URL, { headers: authHeader() });
}

const getPeopleById = (id) => {
    return axios.get(API_URL + "/" + id, { headers: authHeader() });
}

const createPeople = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
}

const deletePeople = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() });
}


const peopleService = {
    getAllPeople,
    getPeopleById,
    createPeople,
    deletePeople,
};

export default peopleService;
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/polls";

const getAllPolls = () => {
    return axios.get(API_URL, { headers: authHeader() });
}

const getPoll = (id) => {
    return axios.get(API_URL + "/" + id, { headers: authHeader() });
}

const pollService = {
    getAllPolls,
    getPoll,
};

export default pollService;
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/polls";

const getAllPolls = () => {
    return axios.get(`${API_URL}/all`  , { headers: authHeader() });
}

const getPollbyId = (id) => {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
}

const createPoll = (poll) => {
    return axios.post(`${API_URL}/create`, poll, { headers: authHeader() });
}

const deletePoll = (id) => {
    return axios.delete(`${API_URL}/${id}/delete`, { headers: authHeader() });
}

const pollService = {
    getAllPolls,
    getPollbyId,
    createPoll,
    deletePoll
};

export default pollService;
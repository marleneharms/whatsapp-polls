import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_API_URL}/groups`;

const getAllGroups = () => {
    return axios.get(`${API_URL}/all`  , { headers: authHeader() });
}

const getGroupById = (id) => {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
}

const createGroup = (group) => {
    return axios.post(`${API_URL}/create`, group, { headers: authHeader() });
}

const deleteGroup = (id) => {
    return axios.delete(`${API_URL}/${id}/delete`, { headers: authHeader() });
}

const groupService = {
    getAllGroups,
    getGroupById,
    createGroup,
    deleteGroup
};

export default groupService;
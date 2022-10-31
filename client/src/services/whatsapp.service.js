import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_API_URL}/whatsapp`;

const sendWhatsappPoll = (poll) => {
    return axios.post(`${API_URL}/send-poll-to-all`, poll, { headers: authHeader() });
}

const whatsappService = {
    sendWhatsappPoll
};

export default whatsappService;
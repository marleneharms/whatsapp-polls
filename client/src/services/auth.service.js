import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

const register = (username, email, password) => {
    return axios
        .post(API_URL + "/register", {
            username,
            email,
            password,
        })
        .then((response) => {
            if (response.message && response.message === "Success") {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "/login", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.data && response.data.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
            }

            return response.data.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;

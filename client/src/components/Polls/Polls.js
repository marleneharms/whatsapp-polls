import { useState, useEffect } from "react";
import pollService from "../../services/polls.service";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Polls() {
    const [polls, setPolls] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        pollService.getAllPolls().then(
            (response) => {
                console.log(response.data);
                setPolls(response.data);
            },
            (error) => {
                console.log("Private page", error.response);
                console.log(error);
                // Invalid token
                if (error.response && error.response.status === 401) {
                    authService.logout();
                    navigate("/login");
                    window.location.reload();
                }
            }
        );
    }, []);

    return (
        <div>
            <h3>{polls.map((poll) => poll.name)}</h3>
        </div>
    );
};

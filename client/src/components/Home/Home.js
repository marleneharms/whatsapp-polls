import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../../utils/Toast";
import authService from "../../services/auth.service";

import "./Home.styles.css";

const Home = () => {
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setUser(user);
        } else {
            navigate("/login");
            window.location.reload();
        }
    }, []);

    return (
        <div className="home">
            {/* Explain for what's the page and how to use it */}
            <h1>Welcome {user?.username}</h1>
            <p>
                This website allows you to create people and groups. <br /> You
                can then send a poll trough whatsapp API so people can vote in
                the easiest way possible.
            </p>

            <div className="explanation-container">
                <img src="./assets/images/team.png" alt="team" />
                <div className="explanation">
                    <p>
                        <b>1.</b> Create individual people, that can be added to
                        groups or sent a poll.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/people")}
                    >
                        Go to people
                    </button>
                </div>
            </div>

            <div className="explanation-container reverse">
                <img src="./assets/images/send.png" alt="send" />
                <div className="explanation">
                    <p>
                        <b>2.</b> Create groups with the previously created
                        people. Or create a new one using CSV file.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/groups")}
                    >
                        Go to groups
                    </button>
                </div>
            </div>

            <div className="explanation-container">
                <img src="./assets/images/gather.png" alt="gather" />
                <div className="explanation">
                    <p>
                        <b>3.</b> Create a poll with up to 10 options and send
                        it to individual people or groups.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/polls")}
                    >
                        Go to polls
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;

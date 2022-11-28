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
            <h1>Home</h1>
            <p>
                Welcome to the home page. You can only see this page if you are
                logged in.
            </p>
        </div>
    );
};

export default Home;

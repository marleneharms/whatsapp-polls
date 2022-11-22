import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import authService from "./services/auth.service";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Polls from "./components/Polls/Polls";
import People from "./components/People/People";
import Groups from "./components/Groups/Groups";

function App() {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = authService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        authService.logout();
    };

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                            Home
                        </Link>
                    </li>

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/polls"} className="nav-link">
                                Polls
                            </Link>
                        </li>
                    )}

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/people"} className="nav-link">
                                People
                            </Link>
                        </li>
                    )}

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/groups"} className="nav-link">
                                Groups
                            </Link>
                        </li>
                    )}
                </div>


                {currentUser ? (
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a
                                href="/login"
                                className="nav-link"
                                onClick={logOut}
                            >
                                Logout
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Register
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/polls" element={<Polls />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/people" element={<People />} />
                    <Route path="/groups" element={<Groups />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

import { notifyError, notifySuccessWithCallback } from "../../utils/Toast";

import "./Login.styles.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await authService.login(username, password).then(
                () => {
                    setError(undefined);
                    notifySuccessWithCallback(`Welcome ${username.toUpperCase()}`, () => {
                        navigate("/");
                        window.location.reload();
                    });
                },
                (error) => {
                    if (
                        error.response.status === 500 ||
                        error.response.data.message !== undefined
                    ) {
                        const { message } = error.response.data;
                        notifyError(message);
                        setError(message);
                    }
                }
            );
        } catch (error) {
            notifyError(
                "There was an error logging in. Please try again later."
            );
        }
    };

    return (
        <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="user-box">
                    <input
                        type="text"
                        placeholder="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="user-box">
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Set notification on error  */}
                {error && (
                    <div role="alert" className="errorMsg">
                        {error}
                    </div>
                )}

                <button type="submit">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Log in
                </button>
            </form>
        </div>
    );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await authService.login(username, password).then(
                () => {
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h3>Login</h3>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log in</button>
            </form>
        </div>
    );
}

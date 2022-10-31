import { useState } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await authService.register(username, email, password).then(
                () => {
                    setError(undefined);
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    if (error.response.status === 500 || error.response.data.message !== undefined) {
                        setError(error.response.data.message);
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="login-box">
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
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
                        type="email"
                        placeholder="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
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
                    <div role="alert" className="errorMsg" >
                        {error}
                    </div>
                )}

                <button type="submit">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;

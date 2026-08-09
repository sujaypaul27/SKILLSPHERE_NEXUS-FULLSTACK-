import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();
        setError("");

        const result = login(email, password);

        if (!result.success) {
            setError(result.message);
            return;
        }

        if (result.user.role === "HR") {
            navigate("/hr");
        } else {
            navigate("/employee");
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="brand">
                    <div className="brand-icon">S</div>

                    <div>
                        <h1>SkillSphere</h1>
                        <p>Nexus Workforce Management</p>
                    </div>
                </div>

                <div className="login-heading">
                    <h2>Welcome back</h2>
                    <p>Sign in to continue to your workspace</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button type="submit">
                        Sign In
                    </button>

                </form>

                <div className="demo-login">

                    <p>Demo accounts</p>

                    <div>
                        <strong>HR:</strong>{" "}
                        hr@skillsphere.com / hr123
                    </div>

                    <div>
                        <strong>Employee:</strong>{" "}
                        employee@skillsphere.com / employee123
                    </div>

                </div>

            </div>

        </div>
    );
}
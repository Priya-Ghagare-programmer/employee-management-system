import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    return (
        <div className="auth-page">

            <div className="auth-card text-center">

                <div className="auth-logo">
                    <i className="bi bi-building"></i>
                </div>

                <h2>Welcome Back</h2>

                <p>
                    Select your login type
                </p>

                <div className="d-grid gap-3 mt-4">

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/admin-login")}
                    >
                        <i className="bi bi-shield-lock me-2"></i>
                        Admin Login
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={() => navigate("/employee-login")}
                    >
                        <i className="bi bi-person-circle me-2"></i>
                        Employee Login
                    </button>

                </div>

            </div>

        </div>
    );
}
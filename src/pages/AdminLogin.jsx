import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

export default function AdminLogin() {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const submit = async (e) => {

        e.preventDefault();
        setError("");

        try {

            const { data } = await authApi.login(form);

            // Make sure this is an ADMIN login
            if (data.role !== "ADMIN") {
                setError("This account is not an admin account.");
                return;
            }

            // =========================
            // STORE JWT TOKEN
            // =========================

            localStorage.setItem(
                "token",
                data.token
            );

            // =========================
            // ADMIN LOCAL STORAGE
            // =========================

            localStorage.setItem("adminRole", data.role);
            localStorage.setItem("adminEmail", data.email);
            localStorage.setItem("adminName", "Admin");

            navigate("/admin/dashboard");

        } catch (err) {

            console.error("Admin login error:", err);

            setError(
                err.response?.data?.message ||
                "Invalid admin email or password"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    <i className="bi bi-shield-lock"></i>
                </div>

                <h2>Admin Login</h2>

                <p>
                    Sign in to Admin Dashboard
                </p>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={submit}>

                    <label>Email</label>

                    <input
                        className="form-control mb-3"
                        type="email"
                        value={form.email}
                        onChange={e =>
                            setForm({
                                ...form,
                                email: e.target.value
                            })
                        }
                        required
                    />

                    <label>Password</label>

                    <input
                        className="form-control mb-4"
                        type="password"
                        value={form.password}
                        onChange={e =>
                            setForm({
                                ...form,
                                password: e.target.value
                            })
                        }
                        required
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Admin Login
                    </button>

                </form>

                <p className="auth-footer">
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => navigate("/login")}
                    >
                        Back to Login
                    </button>
                </p>

            </div>

        </div>
    );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

export default function EmployeeLogin() {

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

            // Make sure this is an EMPLOYEE login
            if (data.role !== "EMPLOYEE") {
                setError("This account is not an employee account.");
                return;
            }

            // =========================
            // EMPLOYEE LOCAL STORAGE
            // =========================

            localStorage.setItem(
                "employeeRole",
                data.role
            );

            localStorage.setItem(
                "employeeEmail",
                data.email
            );

            localStorage.setItem(
                "employeeDbId",
                data.id
            );

            localStorage.setItem(
                "employeeBusinessId",
                data.employeeId
            );

            localStorage.setItem(
                "employeeName",
                data.firstName
            );

            navigate("/employee/dashboard");

        } catch (err) {

            console.error("Employee login error:", err);

            setError(
                err.response?.data?.message ||
                "Invalid employee email or password"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    <i className="bi bi-person-circle"></i>
                </div>

                <h2>Employee Login</h2>

                <p>
                    Sign in to Employee Dashboard
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
                        Employee Login
                    </button>

                </form>

                <p className="auth-footer">

                    New employee?{" "}

                    <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={() => navigate("/register")}
                    >
                        Register here
                    </button>

                </p>

                <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => navigate("/login")}
                >
                    Back to Login
                </button>

            </div>

        </div>
    );
}
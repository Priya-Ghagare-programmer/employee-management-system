import { useNavigate } from "react-router-dom";
import {
    logout,
    getAdminName,
    getEmployeeName
} from "../utils/auth";

export default function Topbar({ title }) {

    const navigate = useNavigate();

    const adminRole = localStorage.getItem("adminRole");

    const isAdmin = adminRole === "ADMIN";

    // Admin name or Employee first name
    const name = isAdmin
        ? getAdminName() || "Admin"
        : getEmployeeName() || "Employee";

    const role = isAdmin ? "ADMIN" : "EMPLOYEE";

    return (
        <header className="topbar">

            <div>
                <h4>{title}</h4>

                <small>
                    Welcome back, {name}
                </small>
            </div>

            <div className="topbar-actions">

                <div className="profile-mini">

                    <div className="avatar">
                        {name.charAt(0).toUpperCase()}
                    </div>

                    <div className="d-none d-md-block">

                        <strong>{name}</strong>

                        <small>
                            {role}
                        </small>

                    </div>

                </div>

                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                >
                    <i className="bi bi-box-arrow-right"></i>{" "}
                    Logout
                </button>

            </div>

        </header>
    );
}
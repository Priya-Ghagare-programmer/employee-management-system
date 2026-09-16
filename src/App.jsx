import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import EmployeeLogin from "./pages/EmployeeLogin";
import Register from "./pages/Register";

import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEmployees from "./pages/admin/Employees";
import Departments from "./pages/admin/Departments";
import AdminAttendance from "./pages/admin/Attendance";
import AdminLeaves from "./pages/admin/Leaves";
import AdminTasks from "./pages/admin/Tasks";
import AdminSalary from "./pages/admin/Salary";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import Profile from "./pages/employee/Profile";
import EmployeeAttendance from "./pages/employee/Attendance";
import EmployeeTasks from "./pages/employee/Tasks";
import ApplyLeave from "./pages/employee/ApplyLeave";
import EmployeeLeaves from "./pages/employee/Leaves";
import EmployeeSalary from "./pages/employee/Salary";


// ========================================
// PROTECTED ROUTE
// ========================================

function Protected({ role, children }) {

    const adminRole = localStorage.getItem("adminRole");
    const employeeRole = localStorage.getItem("employeeRole");

    // =========================
    // ADMIN
    // =========================

    if (role === "ADMIN") {

        if (adminRole !== "ADMIN") {
            return <Navigate to="/login" replace />;
        }

        return children;
    }


    // =========================
    // EMPLOYEE
    // =========================

    if (role === "EMPLOYEE") {

        if (employeeRole !== "EMPLOYEE") {
            return <Navigate to="/login" replace />;
        }

        return children;
    }


    return <Navigate to="/login" replace />;
}


// ========================================
// APP
// ========================================

export default function App() {

    return (

        <Routes>

            {/* ==================================
                MAIN LOGIN PAGE
            ================================== */}

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />


            {/* ==================================
                SEPARATE LOGIN PAGES
            ================================== */}

            <Route
                path="/admin-login"
                element={<AdminLogin />}
            />

            <Route
                path="/employee-login"
                element={<EmployeeLogin />}
            />


            {/* ==================================
                EMPLOYEE REGISTRATION
            ================================== */}

            <Route
                path="/register"
                element={<Register />}
            />


            {/* ==================================
                ADMIN ROUTES
            ================================== */}

            <Route
                path="/admin"
                element={
                    <Protected role="ADMIN">
                        <AdminLayout />
                    </Protected>
                }
            >

                <Route
                    path="dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="employees"
                    element={<AdminEmployees />}
                />

                <Route
                    path="departments"
                    element={<Departments />}
                />

                <Route
                    path="attendance"
                    element={<AdminAttendance />}
                />

                <Route
                    path="leaves"
                    element={<AdminLeaves />}
                />

                <Route
                    path="tasks"
                    element={<AdminTasks />}
                />

                <Route
                    path="salary"
                    element={<AdminSalary />}
                />

                <Route
                    index
                    element={
                        <Navigate
                            to="dashboard"
                            replace
                        />
                    }
                />

            </Route>


            {/* ==================================
                EMPLOYEE ROUTES
            ================================== */}

            <Route
                path="/employee"
                element={
                    <Protected role="EMPLOYEE">
                        <EmployeeLayout />
                    </Protected>
                }
            >

                <Route
                    path="dashboard"
                    element={<EmployeeDashboard />}
                />

                <Route
                    path="profile"
                    element={<Profile />}
                />

                <Route
                    path="attendance"
                    element={<EmployeeAttendance />}
                />

                <Route
                    path="tasks"
                    element={<EmployeeTasks />}
                />

                <Route
                    path="apply-leave"
                    element={<ApplyLeave />}
                />

                <Route
                    path="leaves"
                    element={<EmployeeLeaves />}
                />

                <Route
                    path="salary"
                    element={<EmployeeSalary />}
                />

                <Route
                    index
                    element={
                        <Navigate
                            to="dashboard"
                            replace
                        />
                    }
                />

            </Route>


            {/* ==================================
                INVALID URL
            ================================== */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>
    );
}
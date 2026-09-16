import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout() {
  const path = useLocation().pathname;
  const titles = {
    dashboard: "Admin Dashboard", employees: "Employees", departments: "Departments",
    attendance: "Attendance", leaves: "Leave Requests", tasks: "Tasks", salary: "Salary & Payroll"
  };
  const key = path.split("/")[2] || "dashboard";

  return (
    <div className="app-layout">
      <Sidebar type="admin" />
      <main className="main-area">
        <Topbar title={titles[key] || "Admin Dashboard"} />
        <div className="content-area"><Outlet /></div>
      </main>
    </div>
  );
}

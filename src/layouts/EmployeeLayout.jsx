import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function EmployeeLayout() {
  const path = useLocation().pathname;
  const titles = {
    dashboard: "Employee Dashboard", profile: "My Profile", attendance: "My Attendance",
    tasks: "My Tasks", "apply-leave": "Apply Leave", leaves: "My Leaves", salary: "My Salary"
  };
  const key = path.split("/")[2] || "dashboard";

  return (
    <div className="app-layout">
      <Sidebar type="employee" />
      <main className="main-area">
        <Topbar title={titles[key] || "Employee Dashboard"} />
        <div className="content-area"><Outlet /></div>
      </main>
    </div>
  );
}

import { NavLink } from "react-router-dom";

export default function Sidebar({ type }) {
  const adminLinks = [
    ["dashboard", "Dashboard", "bi-speedometer2"],
    ["employees", "Employees", "bi-people"],
    ["departments", "Departments", "bi-diagram-3"],
    ["attendance", "Attendance", "bi-calendar-check"],
    ["leaves", "Leave Requests", "bi-calendar-event"],
    ["tasks", "Tasks", "bi-list-task"],
    ["salary", "Salary & Payroll", "bi-cash-stack"],
  ];

  const employeeLinks = [
    ["dashboard", "Dashboard", "bi-speedometer2"],
    ["profile", "My Profile", "bi-person"],
    ["attendance", "My Attendance", "bi-calendar-check"],
    ["tasks", "My Tasks", "bi-list-task"],
    ["apply-leave", "Apply Leave", "bi-send"],
    ["leaves", "My Leaves", "bi-calendar-event"],
    ["salary", "My Salary", "bi-cash-stack"],
  ];

  const links = type === "admin" ? adminLinks : employeeLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon"><i className="bi bi-building"></i></div>
        <div>
          <h5>HefShine</h5>
          <small>Employee System</small>
        </div>
      </div>

      <div className="sidebar-section-title">{type === "admin" ? "ADMIN MENU" : "EMPLOYEE MENU"}</div>

      <nav>
        {links.map(([path, label, icon]) => (
          <NavLink key={path} to={`/${type}/${path}`} className="sidebar-link">
            <i className={`bi ${icon}`}></i>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

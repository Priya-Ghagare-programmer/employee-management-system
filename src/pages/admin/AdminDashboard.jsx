import { useEffect, useState } from "react";
import { employeeApi, leaveApi, taskApi, departmentApi } from "../../services/api";
import StatCard from "../../components/StatCard";
import PageHeader from "../../components/PageHeader";

export default function AdminDashboard() {
  const [stats,setStats]=useState({employees:0,departments:0,leaves:0,tasks:0});
  useEffect(()=>{
    Promise.all([employeeApi.getAll(),departmentApi.getAll(),leaveApi.getAll(),taskApi.getAll()])
      .then(([e,d,l,t])=>setStats({employees:e.data.length,departments:d.data.length,leaves:l.data.length,tasks:t.data.length}))
      .catch(()=>{});
  },[]);
  return <>
    <PageHeader title="Dashboard" subtitle="Overview of your employee management system" />
    <div className="row g-4">
      <div className="col-xl-3 col-md-6"><StatCard title="Total Employees" value={stats.employees} icon="bi-people"/></div>
      <div className="col-xl-3 col-md-6"><StatCard title="Departments" value={stats.departments} icon="bi-diagram-3"/></div>
      <div className="col-xl-3 col-md-6"><StatCard title="Leave Requests" value={stats.leaves} icon="bi-calendar-event"/></div>
      <div className="col-xl-3 col-md-6"><StatCard title="Tasks" value={stats.tasks} icon="bi-list-task"/></div>
    </div>
    <div className="dashboard-welcome mt-4">
      <i className="bi bi-person-workspace"></i>
      <div><h4>Admin Control Center</h4><p>Manage employees, departments, attendance, leave, tasks and payroll from the sidebar.</p></div>
    </div>
  </>;
}

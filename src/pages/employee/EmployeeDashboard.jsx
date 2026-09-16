import {useEffect,useState} from "react";
import {attendanceApi,taskApi,leaveApi,salaryApi} from "../../services/api";
import {getEmployeeDbId} from "../../utils/auth";
import StatCard from "../../components/StatCard";
import PageHeader from "../../components/PageHeader";

export default function EmployeeDashboard(){
 const id=getEmployeeDbId(),[s,setS]=useState({attendance:0,tasks:0,leaves:0,salary:0});
 useEffect(()=>{if(!id)return;Promise.all([attendanceApi.getByEmployee(id),taskApi.getByEmployee(id),leaveApi.getByEmployee(id),salaryApi.getByEmployee(id)]).then(([a,t,l,sl])=>setS({attendance:a.data.length,tasks:t.data.filter(x=>x.status!=="COMPLETED").length,leaves:l.data.filter(x=>x.status==="PENDING").length,salary:sl.data.length})).catch(()=>{})},[id]);
 return <><PageHeader title="Dashboard" subtitle="Your personal employee overview"/>
 <div className="row g-4"><div className="col-xl-3 col-md-6"><StatCard title="Attendance Records" value={s.attendance} icon="bi-calendar-check"/></div><div className="col-xl-3 col-md-6"><StatCard title="Pending Tasks" value={s.tasks} icon="bi-list-task"/></div><div className="col-xl-3 col-md-6"><StatCard title="Pending Leaves" value={s.leaves} icon="bi-calendar-event"/></div><div className="col-xl-3 col-md-6"><StatCard title="Salary Records" value={s.salary} icon="bi-cash-stack"/></div></div>
 <div className="dashboard-welcome mt-4"><i className="bi bi-person-check"></i><div><h4>Welcome to your dashboard</h4><p>View your profile, attendance, tasks, leaves and salary. Your profile is managed by the Admin.</p></div></div>
 </>;
}

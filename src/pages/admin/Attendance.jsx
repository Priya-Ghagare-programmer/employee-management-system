import {useEffect,useState} from "react";
import {attendanceApi,employeeApi} from "../../services/api";
import PageHeader from "../../components/PageHeader";

export default function Attendance(){
 const [rows,setRows]=useState([]),[employees,setEmployees]=useState([]),[employeeId,setEmployeeId]=useState(""),[status,setStatus]=useState("PRESENT");
 const load=()=>{attendanceApi.getAll().then(r=>setRows(r.data));employeeApi.getAll().then(r=>setEmployees(r.data));};useEffect(load,[]);
 const mark=async e=>{e.preventDefault();await attendanceApi.mark(employeeId,status);load();};
 return <><PageHeader title="Attendance" subtitle="Manage daily employee attendance"/>
 <div className="form-panel mb-4"><form className="row g-3 align-items-end" onSubmit={mark}><div className="col-md-5"><label>Employee</label><select className="form-select" required value={employeeId} onChange={e=>setEmployeeId(e.target.value)}><option value="">Select employee</option>{employees.map(e=><option value={e.id} key={e.id}>{e.employeeId} - {e.firstName} {e.lastName}</option>)}</select></div><div className="col-md-4"><label>Status</label><select className="form-select" value={status} onChange={e=>setStatus(e.target.value)}><option>PRESENT</option><option>ABSENT</option><option>HALF_DAY</option><option>LATE</option></select></div><div className="col-md-3"><button className="btn btn-primary w-100">Mark Attendance</button></div></form></div>
 <div className="table-card"><div className="table-responsive"><table className="table"><thead><tr><th>Employee</th><th>Date</th><th>Login Time</th><th>Status</th></tr></thead><tbody>{rows.map(a=><tr key={a.id}><td>{a.employee?.employeeId} - {a.employee?.firstName} {a.employee?.lastName}</td><td>{a.attendanceDate}</td><td>{a.loginTime||"-"}</td><td><span className={`status-badge ${String(a.status).toLowerCase()}`}>{a.status}</span></td></tr>)}</tbody></table></div></div></>;
}

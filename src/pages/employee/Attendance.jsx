import {useEffect,useState} from "react";
import {attendanceApi} from "../../services/api";
import {getEmployeeDbId} from "../../utils/auth";
import PageHeader from "../../components/PageHeader";

export default function Attendance(){
 const id=getEmployeeDbId(),[rows,setRows]=useState([]);
 const load=()=>attendanceApi.getByEmployee(id).then(r=>setRows(r.data));useEffect(()=>{if(id)load()},[id]);
 const mark=async()=>{await attendanceApi.mark(id,"PRESENT");load()};
 return <><PageHeader title="My Attendance" subtitle="View your attendance records" action={<button className="btn btn-primary" onClick={mark}><i className="bi bi-check2"></i> Mark Today Present</button>}/>
 <div className="table-card"><table className="table"><thead><tr><th>Date</th><th>Login Time</th><th>Status</th></tr></thead><tbody>{rows.map(a=><tr key={a.id}><td>{a.attendanceDate}</td><td>{a.loginTime||"-"}</td><td><span className={`status-badge ${String(a.status).toLowerCase()}`}>{a.status}</span></td></tr>)}</tbody></table></div></>;
}

import {useEffect,useState} from "react";
import {taskApi} from "../../services/api";
import {getEmployeeDbId} from "../../utils/auth";
import PageHeader from "../../components/PageHeader";

export default function Tasks(){
 const id=getEmployeeDbId(),[rows,setRows]=useState([]);
 const load=()=>taskApi.getByEmployee(id).then(r=>setRows(r.data));useEffect(()=>{if(id)load()},[id]);
 const change=async(task,status)=>{await taskApi.updateStatus(task.id,status);load()};
 return <><PageHeader title="My Tasks" subtitle="View assigned tasks and update their status"/>
 <div className="row g-4">{rows.map(t=><div className="col-lg-6" key={t.id}><div className="task-card"><div className="d-flex justify-content-between"><h5>{t.title}</h5><span className={`priority ${String(t.priority).toLowerCase()}`}>{t.priority}</span></div><p>{t.description||"No description"}</p><small>Due: {t.dueDate||"Not specified"}</small><select className="form-select mt-3" value={t.status} onChange={e=>change(t,e.target.value)}><option>ASSIGNED</option><option>IN_PROGRESS</option><option>COMPLETED</option></select></div></div>)}{!rows.length&&<div className="col-12"><div className="empty-state">No tasks assigned.</div></div>}</div></>;
}

import { useEffect, useState } from "react";
import { employeeApi, departmentApi } from "../../services/api";
import PageHeader from "../../components/PageHeader";

const empty={employeeId:"",firstName:"",lastName:"",email:"",phone:"",password:"",designation:"",joiningDate:"",salary:"",address:"",status:"ACTIVE",departmentId:""};

export default function Employees(){
  const [employees,setEmployees]=useState([]),[departments,setDepartments]=useState([]),[form,setForm]=useState(empty),[editing,setEditing]=useState(null),[show,setShow]=useState(false);
  const load=()=>{employeeApi.getAll().then(r=>setEmployees(r.data));departmentApi.getAll().then(r=>setDepartments(r.data));};
  useEffect(load,[]);
  const submit=async e=>{e.preventDefault(); if(editing) await employeeApi.update(editing,form); else await employeeApi.add(form); setForm(empty);setEditing(null);setShow(false);load();};
  const edit=e=>{setEditing(e.id);setForm({...e,departmentId:e.department?.id||""});setShow(true);};
  const remove=async id=>{if(confirm("Delete this employee?")){await employeeApi.delete(id);load();}};
  const set=(k,v)=>setForm({...form,[k]:v});
  return <>
    <PageHeader title="Employees" subtitle="Add, edit and manage employee information"
      action={<button className="btn btn-primary" onClick={()=>{setForm(empty);setEditing(null);setShow(true)}}><i className="bi bi-plus-lg"></i> Add Employee</button>}/>
    {show&&<div className="form-panel mb-4"><div className="d-flex justify-content-between"><h5>{editing?"Edit Employee":"Add Employee"}</h5><button className="btn-close" onClick={()=>setShow(false)}></button></div>
      <form className="row g-3 mt-1" onSubmit={submit}>
        <div className="col-md-4"><label>Employee ID</label><input className="form-control" placeholder="Auto generated if blank" value={form.employeeId||""} onChange={e=>set("employeeId",e.target.value)}/></div>
        <div className="col-md-4"><label>First Name</label><input className="form-control" required value={form.firstName||""} onChange={e=>set("firstName",e.target.value)}/></div>
        <div className="col-md-4"><label>Last Name</label><input className="form-control" value={form.lastName||""} onChange={e=>set("lastName",e.target.value)}/></div>
        <div className="col-md-4"><label>Email</label><input className="form-control" type="email" required value={form.email||""} onChange={e=>set("email",e.target.value)}/></div>
        <div className="col-md-4"><label>Phone</label><input className="form-control" value={form.phone||""} onChange={e=>set("phone",e.target.value)}/></div>
        <div className="col-md-4"><label>Password</label><input className="form-control" type="password" value={form.password||""} onChange={e=>set("password",e.target.value)}/></div>
        <div className="col-md-4"><label>Department</label><select className="form-select" required value={form.departmentId||""} onChange={e=>set("departmentId",e.target.value)}><option value="">Select</option>{departments.map(d=><option key={d.id} value={d.id}>{d.departmentName}</option>)}</select></div>
        <div className="col-md-4"><label>Designation</label><input className="form-control" value={form.designation||""} onChange={e=>set("designation",e.target.value)}/></div>
        <div className="col-md-4"><label>Joining Date</label><input className="form-control" type="date" value={form.joiningDate||""} onChange={e=>set("joiningDate",e.target.value)}/></div>
        <div className="col-md-4"><label>Salary</label><input className="form-control" type="number" value={form.salary||""} onChange={e=>set("salary",e.target.value)}/></div>
        <div className="col-md-4"><label>Status</label><select className="form-select" value={form.status||"ACTIVE"} onChange={e=>set("status",e.target.value)}><option>ACTIVE</option><option>INACTIVE</option></select></div>
        <div className="col-12"><label>Address</label><textarea className="form-control" value={form.address||""} onChange={e=>set("address",e.target.value)}/></div>
        <div className="col-12"><button className="btn btn-primary me-2">Save Employee</button><button type="button" className="btn btn-light" onClick={()=>setShow(false)}>Cancel</button></div>
      </form>
    </div>}
    <div className="table-card"><div className="table-responsive"><table className="table align-middle"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Designation</th><th>Salary</th><th>Status</th><th>Actions</th></tr></thead><tbody>
      {employees.map(e=><tr key={e.id}><td><span className="id-badge">{e.employeeId}</span></td><td><strong>{e.firstName} {e.lastName}</strong></td><td>{e.email}</td><td>{e.department?.departmentName||"-"}</td><td>{e.designation||"-"}</td><td>₹{Number(e.salary||0).toLocaleString("en-IN")}</td><td><span className={`status-badge ${String(e.status).toLowerCase()}`}>{e.status}</span></td><td><button className="btn btn-sm btn-light me-1" onClick={()=>edit(e)}><i className="bi bi-pencil"></i></button><button className="btn btn-sm btn-light text-danger" onClick={()=>remove(e.id)}><i className="bi bi-trash"></i></button></td></tr>)}
      {!employees.length&&<tr><td colSpan="8" className="text-center py-5 text-muted">No employees found.</td></tr>}
    </tbody></table></div></div>
  </>;
}

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi, departmentApi } from "../services/api";

export default function Register() {
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName:"", lastName:"", email:"", phone:"", password:"", designation:"",
    joiningDate:"", salary:"", address:"", status:"ACTIVE", departmentId:""
  });
  const navigate = useNavigate();

  useEffect(() => {
  departmentApi
    .getAll()
    .then((r) => {
      console.log("Departments:", r.data);
      setDepartments(r.data);
    })
    .catch((err) => {
      console.error("Department API Error:", err);
      setError(
        err.response?.data?.message ||
        `Failed to load departments. Status: ${err.response?.status || "Unknown"}`
      );
    });
}, []);

  const submit = async e => {
    e.preventDefault(); setError(""); setMessage("");
    try {
      const {data}=await authApi.register(form);
      setMessage(data.message || "Registration successful");
      setTimeout(()=>navigate("/login"), 1000);
    } catch(err) { setError(err.response?.data?.message || "Registration failed"); }
  };

  const set = (key,value) => setForm({...form,[key]:value});

  return (
    <div className="auth-page register-page">
      <div className="auth-card register-card">
        <div className="auth-logo"><i className="bi bi-person-plus"></i></div>
        <h2>Employee Registration</h2>
        <p>Create your employee account</p>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <form onSubmit={submit} className="row g-3">
          <div className="col-md-6"><label>First Name</label><input className="form-control" required value={form.firstName} onChange={e=>set("firstName",e.target.value)}/></div>
          <div className="col-md-6"><label>Last Name</label><input className="form-control" required value={form.lastName} onChange={e=>set("lastName",e.target.value)}/></div>
          <div className="col-md-6"><label>Email</label><input className="form-control" type="email" required value={form.email} onChange={e=>set("email",e.target.value)}/></div>
          <div className="col-md-6"><label>Phone</label><input className="form-control" value={form.phone} onChange={e=>set("phone",e.target.value)}/></div>
          <div className="col-md-6"><label>Password</label><input className="form-control" type="password" required value={form.password} onChange={e=>set("password",e.target.value)}/></div>
          <div className="col-md-6"><label>Department</label>
            <select className="form-select" required value={form.departmentId} onChange={e=>set("departmentId",e.target.value)}>
              <option value="">Select department</option>{departments.map(d=><option key={d.id} value={d.id}>{d.departmentName}</option>)}
            </select>
          </div>
          <div className="col-md-6"><label>Designation</label><input className="form-control" value={form.designation} onChange={e=>set("designation",e.target.value)}/></div>
          <div className="col-md-6"><label>Joining Date</label><input className="form-control" type="date" value={form.joiningDate} onChange={e=>set("joiningDate",e.target.value)}/></div>
          <div className="col-md-6"><label>Salary</label><input className="form-control" type="number" value={form.salary} onChange={e=>set("salary",e.target.value)}/></div>
          <div className="col-12"><label>Address</label><textarea className="form-control" rows="2" value={form.address} onChange={e=>set("address",e.target.value)}/></div>
          <div className="col-12"><button className="btn btn-primary w-100">Create Account</button></div>
        </form>
        <p className="auth-footer">Already registered? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

import {useEffect,useState} from "react";
import jsPDF from "jspdf";
import {salaryApi,employeeApi} from "../../services/api";
import {getEmployeeDbId,getBusinessEmployeeId} from "../../utils/auth";
import PageHeader from "../../components/PageHeader";

export default function Salary(){
 const [rows,setRows]=useState([]),[employee,setEmployee]=useState(null);
 useEffect(()=>{const id=getEmployeeDbId();salaryApi.getByEmployee(id).then(r=>setRows(r.data));employeeApi.getById(id).then(r=>setEmployee(r.data))},[]);
 const download=s=>{const doc=new jsPDF();doc.setFontSize(20);doc.text("HEFSHINE SOFTWARES",20,20);doc.setFontSize(15);doc.text("Salary Slip",20,32);doc.setFontSize(11);doc.text(`Employee ID: ${getBusinessEmployeeId()}`,20,48);doc.text(`Employee: ${employee?.firstName||""} ${employee?.lastName||""}`,20,56);doc.text(`Month: ${s.month}/${s.year}`,20,64);doc.line(20,70,190,70);doc.text(`Basic Salary: Rs. ${s.basicSalary||0}`,20,82);doc.text(`Allowances: Rs. ${s.allowances||0}`,20,90);doc.text(`Present Days: ${s.presentDays||0}`,20,98);doc.text(`Absent Days: ${s.absentDays||0}`,20,106);doc.text(`Half Days: ${s.halfDays||0}`,20,114);doc.text(`Absent Deduction: Rs. ${s.absentDeduction||0}`,20,122);doc.text(`Other Deduction: Rs. ${s.otherDeduction||0}`,20,130);doc.setFontSize(14);doc.text(`Net Salary: Rs. ${s.netSalary||0}`,20,145);doc.save(`Salary-Slip-${getBusinessEmployeeId()}-${s.month}-${s.year}.pdf`);};
 return <><PageHeader title="My Salary" subtitle="View salary records and download salary slips"/>
 <div className="table-card"><div className="table-responsive"><table className="table"><thead><tr><th>Month</th><th>Basic</th><th>Present</th><th>Absent</th><th>Deduction</th><th>Net Salary</th><th>PDF</th></tr></thead><tbody>{rows.map(s=><tr key={s.id}><td>{s.month}/{s.year}</td><td>₹{Number(s.basicSalary||0).toLocaleString("en-IN")}</td><td>{s.presentDays}</td><td>{s.absentDays}</td><td>₹{Number(s.absentDeduction||0).toLocaleString("en-IN")}</td><td><strong>₹{Number(s.netSalary||0).toLocaleString("en-IN")}</strong></td><td><button className="btn btn-sm btn-primary" onClick={()=>download(s)}><i className="bi bi-file-earmark-pdf"></i> Download</button></td></tr>)}</tbody></table></div></div></>;
}

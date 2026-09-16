import { useEffect, useState } from "react";
import { leaveApi } from "../../services/api";
import { getEmployeeDbId } from "../../utils/auth";
import PageHeader from "../../components/PageHeader";

export default function Leaves() {

    const [rows, setRows] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const employeeId = getEmployeeDbId();

        if (!employeeId) {
            setError("Employee information not found. Please login again.");
            setLoading(false);
            return;
        }

        const fetchLeaves = async () => {

            try {

                const response = await leaveApi.getByEmployee(employeeId);

                console.log("Employee ID:", employeeId);
                console.log("My Leaves:", response.data);

                setRows(response.data);

            } catch (err) {

                console.error("Get Leaves Error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load leaves."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchLeaves();

    }, []);

    return (
        <>
            <PageHeader
                title="My Leaves"
                subtitle="Track your leave applications"
            />

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="table-card">

                <div className="table-responsive">

                    <table className="table">

                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Remark</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>
                                    <td colSpan="6" className="text-center">
                                        Loading leaves...
                                    </td>
                                </tr>

                            ) : rows.length === 0 ? (

                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No leave applications found.
                                    </td>
                                </tr>

                            ) : (

                                rows.map((leave) => (

                                    <tr key={leave.id}>

                                        <td>{leave.leaveType}</td>

                                        <td>{leave.fromDate}</td>

                                        <td>{leave.toDate}</td>

                                        <td>{leave.reason}</td>

                                        <td>
                                            <span
                                                className={`status-badge ${String(
                                                    leave.status
                                                ).toLowerCase()}`}
                                            >
                                                {leave.status}
                                            </span>
                                        </td>

                                        <td>
                                            {leave.adminRemark || "-"}
                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>
        </>
    );
}
import { useEffect, useState } from "react";
import { leaveApi } from "../../services/api";
import PageHeader from "../../components/PageHeader";

export default function Leaves() {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await leaveApi.getAll();

            console.log("All Leave Requests:", response.data);

            setRows(response.data);

        } catch (err) {

            console.error("Admin Leave Error:", err);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to load leave requests."
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        load();
    }, []);

    const decide = async (id, status) => {

        try {

            const remark =
                status === "APPROVED"
                    ? "Approved by admin"
                    : "Rejected by admin";

            await leaveApi.decision(id, status, remark);

            alert(
                status === "APPROVED"
                    ? "Leave approved successfully."
                    : "Leave rejected successfully."
            );

            // Reload leave requests
            load();

        } catch (err) {

            console.error("Leave Decision Error:", err);

            alert(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to update leave status."
            );
        }
    };

    return (
        <>
            <PageHeader
                title="Leave Requests"
                subtitle="Review and approve or reject employee leave requests"
            />

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="table-card">

                <div className="table-responsive">

                    <table className="table align-middle">

                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Type</th>
                                <th>Dates</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>
                                    <td colSpan="6" className="text-center">
                                        Loading leave requests...
                                    </td>
                                </tr>

                            ) : rows.length === 0 ? (

                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No leave requests found.
                                    </td>
                                </tr>

                            ) : (

                                rows.map((leave) => (

                                    <tr key={leave.id}>

                                        <td>
                                            <strong>
                                                {leave.employee?.employeeId || "-"}
                                            </strong>

                                            <br />

                                            {leave.employee?.firstName || ""}{" "}
                                            {leave.employee?.lastName || ""}
                                        </td>

                                        <td>
                                            {leave.leaveType}
                                        </td>

                                        <td>
                                            {leave.fromDate} → {leave.toDate}
                                        </td>

                                        <td>
                                            {leave.reason}
                                        </td>

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

                                            {leave.status === "PENDING" ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-success me-1"
                                                        onClick={() =>
                                                            decide(
                                                                leave.id,
                                                                "APPROVED"
                                                            )
                                                        }
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            decide(
                                                                leave.id,
                                                                "REJECTED"
                                                            )
                                                        }
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-muted">
                                                    Completed
                                                </span>
                                            )}

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
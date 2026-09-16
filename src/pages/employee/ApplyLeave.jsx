import { useState } from "react";
import { leaveApi } from "../../services/api";
import { getEmployeeDbId } from "../../utils/auth";
import PageHeader from "../../components/PageHeader";

export default function ApplyLeave() {

    const [form, setForm] = useState({
        leaveType: "CASUAL",
        fromDate: "",
        toDate: "",
        reason: ""
    });

    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const set = (key, value) => {
        setForm({
            ...form,
            [key]: value
        });
    };

    const submit = async (e) => {

        e.preventDefault();

        setMsg("");
        setError("");

        const employeeId = getEmployeeDbId();

        console.log("Employee DB ID:", employeeId);

        if (!employeeId) {
            setError("Employee information not found. Please login again.");
            return;
        }

        if (!form.fromDate || !form.toDate) {
            setError("Please select both dates.");
            return;
        }

        if (form.toDate < form.fromDate) {
            setError("To Date cannot be before From Date.");
            return;
        }

        if (!form.reason.trim()) {
            setError("Please enter reason for leave.");
            return;
        }

        const requestData = {
            employeeId: Number(employeeId),
            leaveType: form.leaveType,
            fromDate: form.fromDate,
            toDate: form.toDate,
            reason: form.reason
        };

        console.log("Sending Leave Request:", requestData);

        try {

            setLoading(true);

            const response = await leaveApi.apply(requestData);

            console.log("Leave Response:", response.data);

            setMsg("Leave application submitted successfully.");

            setForm({
                leaveType: "CASUAL",
                fromDate: "",
                toDate: "",
                reason: ""
            });

        } catch (err) {

            console.error("LEAVE REQUEST ERROR:", err);
            console.error("Status:", err.response?.status);
            console.error("Response:", err.response?.data);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                err.message ||
                "Unable to submit leave request."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <>
            <PageHeader
                title="Apply Leave"
                subtitle="Submit a leave request to Admin"
            />

            <div className="form-panel narrow-panel">

                {msg && (
                    <div className="alert alert-success">
                        {msg}
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form className="row g-3" onSubmit={submit}>

                    <div className="col-md-6">
                        <label>Leave Type</label>

                        <select
                            className="form-select"
                            value={form.leaveType}
                            onChange={(e) =>
                                set("leaveType", e.target.value)
                            }
                        >
                            <option value="CASUAL">CASUAL</option>
                            <option value="SICK">SICK</option>
                            <option value="PERSONAL">PERSONAL</option>
                            <option value="OTHER">OTHER</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label>From Date</label>

                        <input
                            className="form-control"
                            type="date"
                            required
                            value={form.fromDate}
                            onChange={(e) =>
                                set("fromDate", e.target.value)
                            }
                        />
                    </div>

                    <div className="col-md-6">
                        <label>To Date</label>

                        <input
                            className="form-control"
                            type="date"
                            required
                            min={form.fromDate}
                            value={form.toDate}
                            onChange={(e) =>
                                set("toDate", e.target.value)
                            }
                        />
                    </div>

                    <div className="col-12">
                        <label>Reason</label>

                        <textarea
                            className="form-control"
                            rows="4"
                            required
                            value={form.reason}
                            placeholder="Enter reason for leave"
                            onChange={(e) =>
                                set("reason", e.target.value)
                            }
                        />
                    </div>

                    <div className="col-12">

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading
                                ? "Submitting..."
                                : "Submit Leave Request"}
                        </button>

                    </div>

                </form>

            </div>
        </>
    );
}
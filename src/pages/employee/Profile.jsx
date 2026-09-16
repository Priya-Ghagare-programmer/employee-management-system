import { useEffect, useState } from "react";
import { employeeApi } from "../../services/api";
import {
    getEmployeeDbId,
    getBusinessEmployeeId
} from "../../utils/auth";
import PageHeader from "../../components/PageHeader";

export default function Profile() {

    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const dbId = getEmployeeDbId();

                console.log("Employee DB ID:", dbId);

                if (!dbId) {
                    setError("Employee information not found.");
                    return;
                }

                const response = await employeeApi.getById(dbId);

                console.log("Employee profile:", response.data);

                setEmployee(response.data);

            } catch (err) {

                console.error(
                    "Error loading employee profile:",
                    err
                );

                setError("Unable to load employee profile.");
            }
        };

        loadProfile();

    }, []);

    // Loading
    if (!employee && !error) {
        return (
            <div className="loading">
                Loading profile...
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }

    return (
        <>
            <PageHeader
                title="My Profile"
                subtitle="Your employee information (view only)"
            />

            <div className="profile-card">

                {/* Profile Header */}
                <div className="profile-cover">

                    <div className="big-avatar">
                        {(employee.firstName || "E")
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div>

                        <h3>
                            {employee.firstName}{" "}
                            {employee.lastName}
                        </h3>

                        <p>
                            {employee.designation ||
                                "Employee"}{" "}
                            ·{" "}
                            {getBusinessEmployeeId() ||
                                employee.employeeId}
                        </p>

                    </div>

                </div>


                {/* Employee Information */}
                <div className="row g-4 p-4">

                    <div className="col-md-6">
                        <Info
                            label="Employee ID"
                            value={employee.employeeId}
                        />
                    </div>

                    <div className="col-md-6">
                        <Info
                            label="Email"
                            value={employee.email}
                        />
                    </div>

                    <div className="col-md-6">
                        <Info
                            label="Phone"
                            value={employee.phone}
                        />
                    </div>

                    <div className="col-md-6">
                        <Info
                            label="Department"
                            value={
                                employee.department
                                    ?.departmentName
                            }
                        />
                    </div>

                    <div className="col-md-6">
                        <Info
                            label="Designation"
                            value={employee.designation}
                        />
                    </div>

                    <div className="col-md-6">
                        <Info
                            label="Joining Date"
                            value={employee.joiningDate}
                        />
                    </div>

                    <div className="col-md-6">
                        <Info
                            label="Salary"
                            value={
                                employee.salary != null
                                    ? `₹${Number(
                                        employee.salary
                                    ).toLocaleString("en-IN")}`
                                    : "-"
                            }
                        />
                    </div>

                    <div className="col-12">
                        <Info
                            label="Address"
                            value={employee.address}
                        />
                    </div>

                </div>

            </div>
        </>
    );
}


// Information component
function Info({ label, value }) {

    return (
        <div>
            <small className="text-muted">
                {label}
            </small>

            <div className="info-value">
                {value || "-"}
            </div>
        </div>
    );
}
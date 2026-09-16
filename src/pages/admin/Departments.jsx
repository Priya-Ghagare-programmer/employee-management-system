import { useEffect, useState } from "react";
import { departmentApi } from "../../services/api";
import PageHeader from "../../components/PageHeader";

export default function Departments() {

    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [edit, setEdit] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // =========================
    // LOAD DEPARTMENTS
    // =========================

    const load = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await departmentApi.getAll();

            console.log("Departments:", response.data);

            setItems(response.data);

        } catch (err) {

            console.error("Department loading error:", err);
            console.error("Response:", err.response?.data);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                err.message ||
                "Unable to load departments."
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);


    // =========================
    // SAVE DEPARTMENT
    // =========================

    const save = async (e) => {

        e.preventDefault();

        // Remove extra spaces
        const departmentName = name.trim();

        if (!departmentName) {
            setError("Please enter department name.");
            return;
        }

        try {

            setError("");

            console.log("Department name:", departmentName);

            // =========================
            // UPDATE
            // =========================

            if (edit !== null) {

                const response = await departmentApi.update(
                    edit,
                    {
                        departmentName: departmentName
                    }
                );

                console.log("Department updated:", response.data);

            }

            // =========================
            // ADD
            // =========================

            else {

                const response = await departmentApi.add(
                    {
                        departmentName: departmentName
                    }
                );

                console.log("Department added:", response.data);
            }

            // Clear form
            setName("");
            setEdit(null);

            // Reload departments
            await load();

        } catch (err) {

            console.error("================================");
            console.error("DEPARTMENT SAVE ERROR");
            console.error("Error:", err);
            console.error("Status:", err.response?.status);
            console.error("Data:", err.response?.data);
            console.error("Message:", err.response?.data?.message);
            console.error("================================");

            // Duplicate department
            if (err.response?.status === 500) {

                setError(
                    "Department could not be saved. " +
                    "It may already exist in the database."
                );

            } else {

                setError(
                    err.response?.data?.message ||
                    err.response?.data ||
                    err.message ||
                    "Unable to save department."
                );
            }
        }
    };


    // =========================
    // DELETE
    // =========================

    const remove = async (id) => {

        if (!window.confirm("Delete this department?")) {
            return;
        }

        try {

            setError("");

            await departmentApi.delete(id);

            await load();

        } catch (err) {

            console.error("Department delete error:", err);
            console.error("Response:", err.response?.data);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                err.message ||
                "Unable to delete department."
            );
        }
    };


    // =========================
    // EDIT
    // =========================

    const startEdit = (department) => {

        setEdit(department.id);
        setName(department.departmentName);
        setError("");
    };


    // =========================
    // CANCEL
    // =========================

    const cancelEdit = () => {

        setEdit(null);
        setName("");
        setError("");
    };


    // =========================
    // JSX
    // =========================

    return (
        <>
            <PageHeader
                title="Departments"
                subtitle="Create and manage company departments"
            />

            {/* ERROR MESSAGE */}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="row g-4">

                {/* =========================
                    ADD / EDIT FORM
                ========================= */}

                <div className="col-lg-5">

                    <div className="form-panel">

                        <h5>
                            {edit !== null
                                ? "Edit Department"
                                : "Add Department"}
                        </h5>

                        <form onSubmit={save}>

                            <label>
                                Department Name
                            </label>

                            <input
                                type="text"
                                className="form-control mb-3"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Enter department name"
                                required
                            />

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {edit !== null
                                    ? "Update"
                                    : "Add Department"}
                            </button>

                            {edit !== null && (
                                <button
                                    type="button"
                                    className="btn btn-light ms-2"
                                    onClick={cancelEdit}
                                >
                                    Cancel
                                </button>
                            )}

                        </form>

                    </div>

                </div>


                {/* =========================
                    DEPARTMENT TABLE
                ========================= */}

                <div className="col-lg-7">

                    <div className="table-card">

                        {loading ? (

                            <div className="p-4 text-center">
                                Loading departments...
                            </div>

                        ) : items.length === 0 ? (

                            <div className="p-4 text-center">
                                No departments found.
                            </div>

                        ) : (

                            <table className="table">

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Department</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {items.map((d, i) => (

                                        <tr key={d.id}>

                                            <td>
                                                {i + 1}
                                            </td>

                                            <td>
                                                {d.departmentName}
                                            </td>

                                            <td>

                                                {/* EDIT */}

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-light me-1"
                                                    onClick={() =>
                                                        startEdit(d)
                                                    }
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>

                                                {/* DELETE */}

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-light text-danger"
                                                    onClick={() =>
                                                        remove(d.id)
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        )}

                    </div>

                </div>

            </div>
        </>
    );
}
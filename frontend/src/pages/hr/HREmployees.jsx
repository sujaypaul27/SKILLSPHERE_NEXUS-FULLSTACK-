import { useEffect, useState } from "react";
import { Users, Plus, Trash2 } from "lucide-react";

import Layout from "../../components/layout/Layout";
import {
    getEmployees,
    createEmployee,
    deleteEmployee,
} from "../../services/employeeService";

export default function HREmployees() {

    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        role: "",
        department: "",
        experienceYears: 0,
        rating: 0,
    });

    const loadEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createEmployee({
            ...form,
            experienceYears: Number(form.experienceYears),
            rating: Number(form.rating),
        });

        setForm({
            name: "",
            role: "",
            department: "",
            experienceYears: 0,
            rating: 0,
        });

        setShowForm(false);
        loadEmployees();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this employee?")) return;

        await deleteEmployee(id);
        loadEmployees();
    };

    return (
        <Layout>

            <div className="page-heading hr-page-header">
                <div>
                    <h1>Employees</h1>
                    <p>Manage employee profiles and workforce information</p>
                </div>

                <button
                    className="primary-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    <Plus size={17} />
                    Add Employee
                </button>
            </div>

            {showForm && (
                <div className="dashboard-card employee-form-card">

                    <h3>Add Employee</h3>

                    <form
                        className="employee-form"
                        onSubmit={handleSubmit}
                    >

                        <input
                            name="name"
                            placeholder="Employee name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="role"
                            placeholder="Role"
                            value={form.role}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="department"
                            placeholder="Department"
                            value={form.department}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="experienceYears"
                            placeholder="Experience"
                            value={form.experienceYears}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            step="0.1"
                            name="rating"
                            placeholder="Rating"
                            value={form.rating}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="primary-btn"
                        >
                            Save Employee
                        </button>

                    </form>

                </div>
            )}

            <div className="dashboard-card">

                <div className="card-header">

                    <div>
                        <h3>Employee Directory</h3>
                        <p>{employees.length} employees</p>
                    </div>

                    <Users size={22} />

                </div>

                <div className="hr-table-wrapper">

                    <table className="hr-table">

                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Experience</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>

                        {employees.map(employee => (

                            <tr key={employee.id}>

                                <td>#{employee.id}</td>

                                <td>
                                    <strong>
                                        {employee.name}
                                    </strong>
                                </td>

                                <td>{employee.role}</td>

                                <td>{employee.department}</td>

                                <td>
                                    {employee.experienceYears} years
                                </td>

                                <td>
                                    {employee.rating}/10
                                </td>

                                <td>
                                    <button
                                        className="icon-danger"
                                        onClick={() =>
                                            handleDelete(employee.id)
                                        }
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                    {employees.length === 0 && (
                        <div className="empty-state">
                            No employees found.
                        </div>
                    )}

                </div>

            </div>

        </Layout>
    );
}
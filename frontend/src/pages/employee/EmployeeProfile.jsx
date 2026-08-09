import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
import { getEmployeeById } from "../../services/employeeService";

export default function EmployeeProfile() {

    const { user } = useAuth();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        getEmployeeById(user.employeeId)
            .then(setEmployee)
            .catch(console.error);
    }, [user.employeeId]);

    if (!employee) {
        return (
            <Layout>
                <div className="loading">Loading profile...</div>
            </Layout>
        );
    }

    return (
        <Layout>

            <div className="page-heading">
                <h1>My Profile</h1>
                <p>Your employee information</p>
            </div>

            <div className="profile-card">

                <div className="profile-header">
                    <div>
                        <h2>{employee.name}</h2>
                        <p>{employee.role}</p>
                    </div>
                </div>

                <div className="profile-grid">

                    <div className="profile-section">
                        <h3>Employee Information</h3>

                        <p><strong>Employee ID:</strong> {employee.id}</p>
                        <p><strong>Name:</strong> {employee.name}</p>
                        <p><strong>Role:</strong> {employee.role}</p>
                        <p><strong>Department:</strong> {employee.department}</p>
                    </div>

                    <div className="profile-section">
                        <h3>Experience</h3>

                        <p>
                            <strong>Experience:</strong>{" "}
                            {employee.experienceYears} years
                        </p>

                        <p>
                            <strong>Rating:</strong>{" "}
                            {employee.rating}/10
                        </p>
                    </div>

                </div>

            </div>

        </Layout>
    );
}
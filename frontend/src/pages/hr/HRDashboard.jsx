import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";

import { getEmployees } from "../../services/employeeService";
import {
    getSkills,
    getVerifiedSkills,
} from "../../services/skillService";
import {
    getAssessments,
} from "../../services/assessmentService";

export default function HRDashboard() {

    const [employees, setEmployees] = useState(0);
    const [skills, setSkills] = useState(0);
    const [assessments, setAssessments] = useState(0);
    const [verifiedSkills, setVerifiedSkills] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const employeeData =
                    await getEmployees();

                setEmployees(
                    (employeeData || []).length
                );

            } catch (error) {
                console.error(
                    "Employees error:",
                    error
                );
            }

            try {

                const skillData =
                    await getSkills();

                setSkills(
                    (skillData || []).length
                );

            } catch (error) {
                console.error(
                    "Skills error:",
                    error
                );
            }

            try {

                const assessmentData =
                    await getAssessments();

                setAssessments(
                    (assessmentData || []).length
                );

            } catch (error) {
                console.error(
                    "Assessments error:",
                    error
                );
            }

            try {

                const verifiedData =
                    await getVerifiedSkills();

                setVerifiedSkills(
                    (verifiedData || []).length
                );

            } catch (error) {
                console.error(
                    "Verified skills error:",
                    error
                );
            }

            setLoading(false);
        };

        loadDashboard();

    }, []);

    return (
        <Layout>

            <div className="page-heading">

                <h1>HR Dashboard</h1>

                <p>
                    Employee skill management,
                    assessments, competencies and
                    certifications.
                </p>

            </div>

            <div className="stats">

                <div className="stat-card">
                    <span>Employees</span>

                    <strong>
                        {loading
                            ? "Loading..."
                            : employees}
                    </strong>

                    <small>
                        Active employees
                    </small>
                </div>

                <div className="stat-card">
                    <span>Skills Tracked</span>

                    <strong>
                        {loading
                            ? "Loading..."
                            : skills}
                    </strong>

                    <small>
                        Across all employees
                    </small>
                </div>

                <div className="stat-card">
                    <span>Assessments</span>

                    <strong>
                        {loading
                            ? "Loading..."
                            : assessments}
                    </strong>

                    <small>
                        Total assessments
                    </small>
                </div>

                <div className="stat-card">
                    <span>Verified Skills</span>

                    <strong>
                        {loading
                            ? "Loading..."
                            : verifiedSkills}
                    </strong>

                    <small>
                        Verified by HR
                    </small>
                </div>

            </div>

        </Layout>
    );
}
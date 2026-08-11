import { useEffect, useState } from "react";
import { ClipboardCheck } from "lucide-react";

import Layout from "../../components/layout/Layout";
import { getAssessments } from "../../services/assessmentService";
import { getEmployees } from "../../services/employeeService";
import { getSkills } from "../../services/skillService";

export default function HRAssessments() {
    const [assessments, setAssessments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        Promise.all([
            getAssessments(),
            getEmployees(),
            getSkills()
        ])
            .then(([assessmentData, employeeData, skillData]) => {
                setAssessments(assessmentData);
                setEmployees(employeeData);
                setSkills(skillData);
            })
            .catch(console.error);
    }, []);

    const getEmployeeName = (employeeId) => {
        const employee = employees.find(
            emp => emp.id === employeeId
        );

        return employee ? employee.name : `Employee #${employeeId}`;
    };

    const getSkillName = (skillId) => {
        const skill = skills.find(
            skill => skill.id === skillId
        );

        return skill ? skill.skillName : `Skill #${skillId}`;
    };

    return (
        <Layout>

            <div className="page-heading">
                <h1>Assessments</h1>
                <p>Monitor employee assessment performance</p>
            </div>

            <div className="dashboard-card">

                <div className="card-header">
                    <div>
                        <h3>Assessment Results</h3>
                        <p>{assessments.length} assessments</p>
                    </div>

                    <ClipboardCheck size={22} />
                </div>

                <table className="hr-table">

                    <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Skill</th>
                        <th>Score</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>

                    {assessments.map(item => (

                        <tr key={item.id}>

                            <td>
                                <strong>
                                    {getEmployeeName(item.employeeId)}
                                </strong>
                            </td>

                            <td>
                                {getSkillName(item.skillId)}
                            </td>

                            <td>
                                <strong>
                                    {item.score}%
                                </strong>
                            </td>

                            <td>
                                <span
                                    className={`status ${
                                        item.passed
                                            ? "valid"
                                            : "expired"
                                    }`}
                                >
                                    {item.passed
                                        ? "PASSED"
                                        : "FAILED"}
                                </span>
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </Layout>
    );
}
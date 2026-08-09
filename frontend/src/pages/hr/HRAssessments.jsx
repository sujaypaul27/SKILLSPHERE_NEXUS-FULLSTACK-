import { useEffect, useState } from "react";
import { ClipboardCheck } from "lucide-react";

import Layout from "../../components/layout/Layout";
import { getAssessments } from "../../services/assessmentService";

export default function HRAssessments() {

    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        getAssessments()
            .then(setAssessments)
            .catch(console.error);
    }, []);

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

                            <td>#{item.employeeId}</td>

                            <td>Skill #{item.skillId}</td>

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
import { useEffect, useState } from "react";
import { Brain, CheckCircle, XCircle } from "lucide-react";

import Layout from "../../components/layout/Layout";
import {
    getSkills,
    verifySkill,
    deleteSkill,
} from "../../services/skillService";

export default function HRSkills() {

    const [skills, setSkills] = useState([]);

    const loadSkills = async () => {
        try {
            const data = await getSkills();
            setSkills(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadSkills();
    }, []);

    const handleVerify = async (id) => {
        await verifySkill(id);
        loadSkills();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this skill?")) return;

        await deleteSkill(id);
        loadSkills();
    };

    return (
        <Layout>

            <div className="page-heading">
                <h1>Skill Management</h1>
                <p>Review, verify and manage employee skills</p>
            </div>

            <div className="dashboard-card">

                <div className="card-header">

                    <div>
                        <h3>Employee Skills</h3>
                        <p>{skills.length} skill records</p>
                    </div>

                    <Brain size={22} />

                </div>

                <div className="hr-table-wrapper">

                    <table className="hr-table">

                        <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Skill</th>
                            <th>Category</th>
                            <th>Proficiency</th>
                            <th>Experience</th>
                            <th>Verification</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>

                        {skills.map(skill => (

                            <tr key={skill.id}>

                                <td>#{skill.employeeId}</td>

                                <td>
                                    <strong>
                                        {skill.skillName}
                                    </strong>
                                </td>

                                <td>{skill.category}</td>

                                <td>
                                    <div className="table-progress">

                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                style={{
                                                    width:
                                                        `${skill.proficiencyLevel * 10}%`,
                                                }}
                                            />
                                        </div>

                                        <span>
                                                {skill.proficiencyLevel}/10
                                            </span>

                                    </div>
                                </td>

                                <td>
                                    {skill.yearsOfExperience} years
                                </td>

                                <td>

                                    {skill.verified ? (
                                        <span className="status valid">
                                                <CheckCircle size={13} />
                                                Verified
                                            </span>
                                    ) : (
                                        <span className="status pending">
                                                Pending
                                            </span>
                                    )}

                                </td>

                                <td>

                                    <div className="table-actions">

                                        {!skill.verified && (
                                            <button
                                                className="icon-success"
                                                onClick={() =>
                                                    handleVerify(skill.id)
                                                }
                                                title="Verify"
                                            >
                                                <CheckCircle size={17} />
                                            </button>
                                        )}

                                        <button
                                            className="icon-danger"
                                            onClick={() =>
                                                handleDelete(skill.id)
                                            }
                                            title="Delete"
                                        >
                                            <XCircle size={17} />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                    {skills.length === 0 && (
                        <div className="empty-state">
                            No skill records found.
                        </div>
                    )}

                </div>

            </div>

        </Layout>
    );
}
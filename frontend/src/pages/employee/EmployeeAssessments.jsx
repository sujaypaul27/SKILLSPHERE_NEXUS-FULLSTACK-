import { useEffect, useState } from "react";
import { ClipboardCheck } from "lucide-react";

import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
import { getAssessmentsByEmployee } from "../../services/assessmentService";
import { getSkills } from "../../services/skillService";

export default function EmployeeAssessments() {
    const { user } = useAuth();

    const [assessments, setAssessments] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAssessments = async () => {
            try {
                const [assessmentData, skillData] =
                    await Promise.all([
                        getAssessmentsByEmployee(user.employeeId),
                        getSkills(),
                    ]);

                setAssessments(assessmentData || []);
                setSkills(skillData || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.employeeId) {
            loadAssessments();
        }
    }, [user]);

    const getSkillName = (skillId) => {
        const skill = skills.find((s) => s.id === skillId);
        return skill?.skillName || `Skill #${skillId}`;
    };

    if (loading) {
        return (
            <Layout>
                <div className="loading">
                    Loading assessments...
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="page-heading">
                <h1>My Assessments</h1>
                <p>View your skill assessment results.</p>
            </div>

            <div className="dashboard-card">
                <div className="card-header">
                    <div>
                        <h3>Assessment History</h3>
                        <p>Your completed skill assessments</p>
                    </div>

                    <ClipboardCheck size={21} />
                </div>

                {assessments.length === 0 ? (
                    <div className="empty-state">
                        No assessments found.
                    </div>
                ) : (
                    <div className="competency-list">
                        {assessments.map((assessment) => (
                            <div
                                className="competency-row"
                                key={assessment.id}
                            >
                                <div>
                                    <strong>
                                        {getSkillName(
                                            assessment.skillId
                                        )}
                                    </strong>

                                    <span>
                                        Assessment #{assessment.id}
                                    </span>
                                </div>

                                <div>
                                    <strong>
                                        {assessment.score}%
                                    </strong>

                                    <span
                                        className={
                                            assessment.passed
                                                ? "verified"
                                                : "expired"
                                        }
                                    >
                                        {assessment.passed
                                            ? "Passed"
                                            : "Failed"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
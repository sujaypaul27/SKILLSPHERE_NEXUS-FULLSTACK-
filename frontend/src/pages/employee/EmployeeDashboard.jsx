import { useEffect, useState } from "react";
import {
    Brain,
    ClipboardCheck,
    Award,
    Target,
    CheckCircle2,
    TrendingUp,
} from "lucide-react";

import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";

import { getEmployeeById } from "../../services/employeeService";
import { getSkills } from "../../services/skillService";
import { getAssessments } from "../../services/assessmentService";
import { getCertifications } from "../../services/certificationService";
import { getCompetenciesByEmployee } from "../../services/competencyService";

export default function EmployeeDashboard() {
    const { user } = useAuth();

    const [employee, setEmployee] = useState(null);
    const [skills, setSkills] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [competencies, setCompetencies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            const employeeId = user?.employeeId;

            if (!employeeId) {
                setLoading(false);
                return;
            }

            try {
                const employeeData =
                    await getEmployeeById(employeeId);

                setEmployee(employeeData);

                try {
                    const data = await getSkills();
                    setSkills(
                        (data || []).filter(
                            (s) =>
                                Number(s.employeeId) ===
                                Number(employeeId)
                        )
                    );
                } catch (error) {
                    console.error("Skills error:", error);
                    setSkills([]);
                }

                try {
                    const data = await getAssessments();
                    setAssessments(
                        (data || []).filter(
                            (a) =>
                                Number(a.employeeId) ===
                                Number(employeeId)
                        )
                    );
                } catch (error) {
                    console.error("Assessments error:", error);
                    setAssessments([]);
                }

                try {
                    const data = await getCertifications();

                    setCertifications(
                        (data || []).filter(
                            (c) =>
                                Number(
                                    c.employeeId ??
                                    c.employeeid
                                ) === Number(employeeId)
                        )
                    );
                } catch (error) {
                    console.error(
                        "Certifications error:",
                        error
                    );
                    setCertifications([]);
                }

                try {
                    const data =
                        await getCompetenciesByEmployee(
                            employeeId
                        );

                    setCompetencies(data || []);
                } catch (error) {
                    console.error(
                        "Competencies error:",
                        error
                    );
                    setCompetencies([]);
                }

            } catch (error) {
                console.error(
                    "Employee loading error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, [user]);

    if (loading) {
        return (
            <Layout>
                <div className="loading">
                    Loading your SkillSphere profile...
                </div>
            </Layout>
        );
    }

    const passedAssessments =
        assessments.filter((a) => a.passed).length;

    const verifiedSkills =
        skills.filter((s) => s.verified).length;

    const averageSkill =
        skills.length > 0
            ? (
                skills.reduce(
                    (sum, skill) =>
                        sum +
                        Number(
                            skill.proficiencyLevel || 0
                        ),
                    0
                ) / skills.length
            ).toFixed(1)
            : "0";

    return (
        <Layout>

            <div className="dashboard-header">

                <div>
                    <span className="eyebrow">
                        EMPLOYEE SKILL PROFILE
                    </span>

                    <h1>
                        Welcome,{" "}
                        {employee?.name || user?.name}
                    </h1>

                    <p>
                        Track your skills, competencies,
                        assessments and certifications.
                    </p>
                </div>

                <div className="profile-summary">

                    <div className="profile-avatar">
                        {(
                            employee?.name ||
                            user?.name ||
                            "U"
                        ).charAt(0)}
                    </div>

                    <div>
                        <strong>
                            {employee?.name ||
                                user?.name}
                        </strong>

                        <span>
                            {employee?.role ||
                                "Employee"}

                            {employee?.department &&
                                ` • ${employee.department}`}
                        </span>
                    </div>

                </div>

            </div>

            <div className="stats-grid">

                <StatCard
                    title="Skills"
                    value={skills.length}
                    subtitle={`${verifiedSkills} verified`}
                    icon={Brain}
                />

                <StatCard
                    title="Average Proficiency"
                    value={`${averageSkill}/10`}
                    subtitle="Across your skills"
                    icon={TrendingUp}
                />

                <StatCard
                    title="Assessments"
                    value={assessments.length}
                    subtitle={`${passedAssessments} passed`}
                    icon={ClipboardCheck}
                />

                <StatCard
                    title="Certifications"
                    value={certifications.length}
                    subtitle="Tracked certifications"
                    icon={Award}
                />

            </div>

            <div className="dashboard-grid">

                <section className="dashboard-card">

                    <div className="card-header">
                        <div>
                            <h3>My Skills</h3>
                            <p>
                                Current skill proficiency
                            </p>
                        </div>

                        <Brain size={21} />
                    </div>

                    {skills.length === 0 ? (
                        <EmptyState text="No skills found." />
                    ) : (
                        <div className="skill-list">

                            {skills.slice(0, 6).map(
                                (skill) => (
                                    <div
                                        className="skill-row"
                                        key={skill.id}
                                    >

                                        <div className="skill-info">
                                            <strong>
                                                {
                                                    skill.skillName
                                                }
                                            </strong>

                                            <span>
                                                {
                                                    skill.category
                                                }
                                            </span>
                                        </div>

                                        <div className="skill-level">

                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    style={{
                                                        width: `${
                                                            Number(
                                                                skill.proficiencyLevel
                                                            ) * 10
                                                        }%`,
                                                    }}
                                                />
                                            </div>

                                            <strong>
                                                {
                                                    skill.proficiencyLevel
                                                }
                                                /10
                                            </strong>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </section>

                <section className="dashboard-card">

                    <div className="card-header">
                        <div>
                            <h3>
                                Competency Overview
                            </h3>

                            <p>
                                Your current competency gaps
                            </p>
                        </div>

                        <Target size={21} />
                    </div>

                    {competencies.length === 0 ? (
                        <EmptyState
                            text="No competency records found."
                        />
                    ) : (
                        <div className="competency-list">

                            {competencies
                                .slice(0, 5)
                                .map((competency) => (
                                    <div
                                        className="competency-row"
                                        key={competency.id}
                                    >

                                        <div>
                                            <strong>
                                                {
                                                    competency.competencyName
                                                }
                                            </strong>

                                            <span>
                                                Current:{" "}
                                                {
                                                    competency.currentLevel
                                                }
                                                /10
                                            </span>
                                        </div>

                                        <div className="gap-badge">
                                            Gap{" "}
                                            {competency.gap}
                                        </div>

                                    </div>
                                ))}

                        </div>
                    )}

                </section>

            </div>

            <section className="dashboard-card certifications-card">

                <div className="card-header">

                    <div>
                        <h3>Certifications</h3>

                        <p>
                            Your certification status
                        </p>
                    </div>

                    <Award size={21} />

                </div>

                {certifications.length === 0 ? (
                    <EmptyState
                        text="No certifications found."
                    />
                ) : (
                    <div className="certification-grid">

                        {certifications.map((cert) => (
                            <div
                                className="certification-item"
                                key={cert.id}
                            >

                                <div className="cert-icon">
                                    <Award size={20} />
                                </div>

                                <div>
                                    <strong>
                                        {
                                            cert.certificationName
                                        }
                                    </strong>

                                    <span>
                                        {cert.provider}
                                    </span>
                                </div>

                                <span
                                    className={`status ${
                                        cert.status
                                            ?.toLowerCase()
                                            .includes(
                                                "expired"
                                            )
                                            ? "expired"
                                            : "valid"
                                    }`}
                                >
                                    {cert.status}
                                </span>

                            </div>
                        ))}

                    </div>
                )}

            </section>

        </Layout>
    );
}

function StatCard({
                      title,
                      value,
                      subtitle,
                      icon: Icon,
                  }) {
    return (
        <div className="stat-card">

            <div className="stat-icon">
                <Icon size={21} />
            </div>

            <div>
                <span>{title}</span>
                <strong>{value}</strong>
                <small>{subtitle}</small>
            </div>

        </div>
    );
}

function EmptyState({ text }) {
    return (
        <div className="empty-state">
            <CheckCircle2 size={24} />
            <span>{text}</span>
        </div>
    );
}
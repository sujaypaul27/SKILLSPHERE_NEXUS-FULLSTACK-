import { useEffect, useState } from "react";
import { Brain, CheckCircle } from "lucide-react";

import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
import { getSkillsByEmployee } from "../../services/skillService";

export default function EmployeeSkills() {

    const { user } = useAuth();
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        getSkillsByEmployee(user.employeeId)
            .then(setSkills)
            .catch(console.error);
    }, [user.employeeId]);

    return (
        <Layout>

            <div className="page-heading">
                <h1>My Skills</h1>
                <p>Technical, domain and soft skills</p>
            </div>

            <div className="dashboard-card">

                <div className="card-header">
                    <div>
                        <h3>Skill Profile</h3>
                        <p>Your current proficiency levels</p>
                    </div>

                    <Brain size={22} />
                </div>

                {skills.length === 0 ? (
                    <div className="empty-state">
                        No skills found.
                    </div>
                ) : (
                    <div className="skill-list">

                        {skills.map(skill => (

                            <div className="skill-row" key={skill.id}>

                                <div className="skill-info">
                                    <strong>{skill.skillName}</strong>
                                    <span>
                                        {skill.category} •{" "}
                                        {skill.yearsOfExperience} years
                                    </span>
                                </div>

                                <div className="skill-level">

                                    <div className="progress">
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${skill.proficiencyLevel * 10}%`
                                            }}
                                        />
                                    </div>

                                    <strong>
                                        {skill.proficiencyLevel}/10
                                    </strong>

                                    {skill.verified && (
                                        <CheckCircle
                                            size={18}
                                            className="verified"
                                        />
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </Layout>
    );
}
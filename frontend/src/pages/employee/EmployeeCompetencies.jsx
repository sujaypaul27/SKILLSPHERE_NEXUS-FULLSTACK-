import { useEffect, useState } from "react";
import { Target } from "lucide-react";

import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
import {
    getCompetenciesByEmployee
} from "../../services/competencyService";

export default function EmployeeCompetencies() {

    const { user } = useAuth();
    const [competencies, setCompetencies] = useState([]);

    useEffect(() => {
        getCompetenciesByEmployee(user.employeeId)
            .then(setCompetencies)
            .catch(console.error);
    }, [user.employeeId]);

    return (
        <Layout>

            <div className="page-heading">
                <h1>Competencies</h1>
                <p>Track your competency framework and gaps</p>
            </div>

            <div className="dashboard-card">

                <div className="card-header">
                    <div>
                        <h3>Competency Mapping</h3>
                        <p>Required level vs current level</p>
                    </div>

                    <Target size={22} />
                </div>

                {competencies.length === 0 ? (
                    <div className="empty-state">
                        No competency records found.
                    </div>
                ) : (

                    <div className="competency-list">

                        {competencies.map(item => (

                            <div
                                className="competency-row"
                                key={item.id}
                            >

                                <div>
                                    <strong>
                                        {item.competencyName}
                                    </strong>

                                    <span>
                                        Required: {item.requiredLevel}/10
                                        {" • "}
                                        Current: {item.currentLevel}/10
                                    </span>
                                </div>

                                <span className="gap-badge">
                                    Gap {item.gap}
                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </Layout>
    );
}
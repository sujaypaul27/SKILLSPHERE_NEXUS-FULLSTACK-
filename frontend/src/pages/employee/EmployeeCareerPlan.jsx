import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import careerPlanService from '../../services/careerPlanService';

const EmployeeCareerPlan = () => {
    const { user } = useAuth();
    const [plans, setPlans] = useState([]);
    const [roadmap, setRoadmap] = useState(null);

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        try {
            const res = await careerPlanService.getByEmployee(user.employeeId);
            setPlans(res.data);
        } catch (error) {
            console.error('Error loading plans:', error);
        }
    };

    const viewRoadmap = async (id) => {
        try {
            const res = await careerPlanService.getRoadmap(id);
            setRoadmap(res.data);
        } catch (error) {
            console.error('Error loading roadmap:', error);
        }
    };

    return (
        <div className="employee-page">
            <h2>My Career Plan</h2>

            {plans.length === 0 && <p>No career plan assigned yet.</p>}

            {plans.map(plan => (
                <div key={plan.id} className="dashboard-card">
                    <h3>{plan.currentRole} → {plan.targetRole}</h3>
                    <p>Progress: {plan.progressPercentage}%</p>
                    <p>Mentor: {plan.mentorName || 'Not Assigned'}</p>
                    <p>Eligible In: {plan.eligibleInMonths != null ? `${plan.eligibleInMonths} months` : 'N/A'}</p>
                    <button onClick={() => viewRoadmap(plan.id)}>View Roadmap</button>
                </div>
            ))}

            {roadmap && (
                <div className="modal-overlay" onClick={() => setRoadmap(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h3>Roadmap: {roadmap.currentRole} → {roadmap.targetRole}</h3>
                        <p>Progress: {roadmap.progressPercentage}%</p>
                        <p>Mentor: {roadmap.mentorName || 'Not Assigned'}</p>

                        {roadmap.skillGaps && (
                            <div>
                                <h4>Skill Gaps</h4>
                                <ul>
                                    {roadmap.skillGaps.map((g, i) => (
                                        <li key={i}>{g.competencyName}: +{g.gap} (current {g.currentLevel}/{g.requiredLevel})</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button onClick={() => setRoadmap(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeCareerPlan;
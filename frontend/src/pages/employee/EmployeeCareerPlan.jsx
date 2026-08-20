import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, User, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import careerPlanService from '../../services/careerPlanService';

const EmployeeCareerPlan = () => {
    const { user } = useAuth();
    const [plans, setPlans] = useState([]);
    const [roadmap, setRoadmap] = useState(null);

    const loadPlans = useCallback(async () => {
        try {
            const res = await careerPlanService.getByEmployee(user.employeeId);
            setPlans(res.data);
            if (res.data.length > 0) {
                const roadmapRes = await careerPlanService.getRoadmap(res.data[0].id);
                setRoadmap(roadmapRes.data);
            }
        } catch (error) {
            console.error('Error loading plans:', error);
        }
    }, [user.employeeId]);

    useEffect(() => {
        loadPlans();
    }, [loadPlans]);

    const gapClass = (g) => (g >= 3 ? 'high' : g >= 1 ? 'low' : 'none');

    if (plans.length === 0) {
        return (
            <div className="content">
                <div className="career-hero">
                    <h1>My Career Plan</h1>
                    <p>No career plan assigned yet. Check back later.</p>
                </div>
            </div>
        );
    }

    const plan = plans[0];
    const pct = Math.round(plan.progressPercentage || 0);

    return (
        <div className="content">
            <div className="career-hero">
                <h1><TrendingUp size={22} style={{ verticalAlign: 'middle', marginRight: 8 }} />My Career Plan</h1>
                <p>Your path from {plan.currentRole} to {plan.targetRole}</p>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <div className="card-header">
                        <div>
                            <h3>Career Roadmap</h3>
                            <p>Current progress toward your target role</p>
                        </div>
                    </div>
                    <div className="roadmap-track">
                        <div className="roadmap-node current">{plan.currentRole}</div>
                        <span className="roadmap-arrow">→</span>
                        <div className="roadmap-node target">{plan.targetRole}</div>
                    </div>
                    <div className="progress-ring-wrap">
                        <div className="progress-circle" style={{ '--pct': pct }}>
                            <span>{pct}%</span>
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                <User size={15} color="#4f2aa8" />
                                <span>Mentor: <strong>{plan.mentorName || 'Not assigned'}</strong></span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Clock size={15} color="#4f2aa8" />
                                <span>Eligible in <strong>{plan.eligibleInMonths ?? '-'}</strong> months</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <div>
                            <h3>Skill Gap Analysis</h3>
                            <p>Skills to close before promotion</p>
                        </div>
                    </div>
                    {roadmap?.skillGaps?.length > 0 ? (
                        roadmap.skillGaps.map((g, i) => (
                            <div className="skillgap-card" key={i}>
                                <div>
                                    <strong>{g.competencyName}</strong>
                                    <span>Current {g.currentLevel} / Required {g.requiredLevel}</span>
                                </div>
                                <span className={`gap-pill ${gapClass(g.gap)}`}>
                  {g.gap > 0 ? `+${g.gap} gap` : 'On track'}
                </span>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">No skill gap data available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeCareerPlan;
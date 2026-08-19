import { useState, useEffect } from 'react';
import analyticsService from '../../services/analyticsService';

const HRExecutiveDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [training, setTraining] = useState(null);

    useEffect(() => {
        analyticsService.getExecutiveDashboard().then(res => setDashboard(res.data));
        analyticsService.getTrainingAnalytics().then(res => setTraining(res.data));
    }, []);

    if (!dashboard || !training) return <div>Loading...</div>;

    return (
        <div className="hr-page">
            <h2>Executive Dashboard</h2>
            <div className="dashboard-cards">
                <div className="dashboard-card"><h3>{dashboard.activeCareerPlans}</h3><p>Active Career Plans</p></div>
                <div className="dashboard-card"><h3>{dashboard.promotionsThisYear}</h3><p>Promotions This Year</p></div>
                <div className="dashboard-card"><h3>{dashboard.skillCoveragePercentage}%</h3><p>Skill Coverage</p></div>
                <div className="dashboard-card"><h3>{dashboard.totalJobOpenings}</h3><p>Job Openings</p></div>
            </div>
            <h3>Training Analytics</h3>
            <div className="dashboard-cards">
                <div className="dashboard-card"><h3>{training.totalCourses}</h3><p>Total Courses</p></div>
                <div className="dashboard-card"><h3>{training.totalEnrollments}</h3><p>Total Enrollments</p></div>
                <div className="dashboard-card"><h3>{training.completionRate?.toFixed(1)}%</h3><p>Completion Rate</p></div>
                <div className="dashboard-card"><h3>{training.avgScore?.toFixed(1)}</h3><p>Avg Score</p></div>
            </div>
        </div>
    );
};

export default HRExecutiveDashboard;
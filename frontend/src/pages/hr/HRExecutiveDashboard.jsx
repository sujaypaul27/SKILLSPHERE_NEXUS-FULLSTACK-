import { useState, useEffect, useCallback } from 'react';
import { Users, Award, Target, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';
import analyticsService from '../../services/analyticsService';

const HRExecutiveDashboard = () => {
    const [dash, setDash] = useState(null);
    const [training, setTraining] = useState(null);

    const loadData = useCallback(async () => {
        try {
            const [dashRes, trainRes] = await Promise.all([
                analyticsService.getExecutiveDashboard(),
                analyticsService.getTrainingAnalytics(),
            ]);
            setDash(dashRes.data);
            setTraining(trainRes.data);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    if (!dash || !training) return <div className="loading">Loading dashboard...</div>;

    return (
        <div className="content">
            <div className="page-heading">
                <h1>Executive Dashboard</h1>
                <p>Career, promotion, and training overview</p>
            </div>

            <div className="exec-dash-grid">
                <div className="exec-card">
                    <div className="exec-card-label">Active Career Plans</div>
                    <div className="exec-card-value">{dash.activeCareerPlans}</div>
                    <div className="exec-card-sub"><Target size={13} style={{ verticalAlign: 'middle' }} /> In progress</div>
                </div>
                <div className="exec-card">
                    <div className="exec-card-label">Promotions This Year</div>
                    <div className="exec-card-value">{dash.promotionsThisYear}</div>
                    <div className="exec-card-sub"><Award size={13} style={{ verticalAlign: 'middle' }} /> Completed plans</div>
                </div>
                <div className="exec-card">
                    <div className="exec-card-label">Skill Coverage</div>
                    <div className="exec-card-value">{dash.skillCoveragePercentage}%</div>
                    <div className="exec-card-sub"><TrendingUp size={13} style={{ verticalAlign: 'middle' }} /> Department level</div>
                </div>
                <div className="exec-card">
                    <div className="exec-card-label">Job Openings</div>
                    <div className="exec-card-value">{dash.totalJobOpenings}</div>
                    <div className="exec-card-sub"><Briefcase size={13} style={{ verticalAlign: 'middle' }} /> Internal portal</div>
                </div>
                <div className="exec-card">
                    <div className="exec-card-label">Total Enrollments</div>
                    <div className="exec-card-value">{dash.totalEnrollments}</div>
                    <div className="exec-card-sub"><GraduationCap size={13} style={{ verticalAlign: 'middle' }} /> Across courses</div>
                </div>
                <div className="exec-card">
                    <div className="exec-card-label">Training Completion</div>
                    <div className="exec-card-value">{Math.round(dash.trainingCompletionRate)}%</div>
                    <div className="exec-card-sub"><Users size={13} style={{ verticalAlign: 'middle' }} /> Completion rate</div>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="card-header">
                    <div>
                        <h3>Training Effectiveness</h3>
                        <p>Course and enrollment breakdown</p>
                    </div>
                </div>
                <div className="stats-grid">
                    <div className="stat-card">
                        <span>Total Courses</span>
                        <strong>{training.totalCourses}</strong>
                    </div>
                    <div className="stat-card">
                        <span>Total Enrollments</span>
                        <strong>{training.totalEnrollments}</strong>
                    </div>
                    <div className="stat-card">
                        <span>Completed</span>
                        <strong>{training.completedEnrollments}</strong>
                    </div>
                    <div className="stat-card">
                        <span>Avg Score</span>
                        <strong>{Math.round(training.avgScore)}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRExecutiveDashboard;
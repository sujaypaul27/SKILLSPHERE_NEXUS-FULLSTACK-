import { useState, useEffect, useCallback } from 'react';
import { Briefcase, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import jobOpeningService from '../../services/jobOpeningService';

const EmployeeJobPortal = () => {
    const { user } = useAuth();
    const [matches, setMatches] = useState([]);

    const loadMatches = useCallback(async () => {
        try {
            const res = await jobOpeningService.getMatchesForEmployee(user.employeeId);
            setMatches(res.data);
        } catch (error) {
            console.error('Error loading matches:', error);
        }
    }, [user.employeeId]);

    useEffect(() => {
        loadMatches();
    }, [loadMatches]);

    const matchClass = (p) => (p >= 70 ? 'high' : p >= 40 ? 'mid' : 'low');

    return (
        <div className="content">
            <div className="career-hero">
                <h1><Briefcase size={22} style={{ verticalAlign: 'middle', marginRight: 8 }} />Internal Job Portal</h1>
                <p>Roles matched to your current skill set</p>
            </div>

            {matches.length === 0 ? (
                <div className="empty-state">No matching job openings found</div>
            ) : (
                <div className="job-grid">
                    {matches.map((m) => (
                        <div className="job-card" key={m.jobId}>
                            <div className="job-card-top">
                                <div>
                                    <h3>{m.title}</h3>
                                    <span><Building2 size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />{m.department}</span>
                                </div>
                                <span className={`match-badge ${matchClass(m.matchPercentage)}`}>
                  {Math.round(m.matchPercentage)}%
                </span>
                            </div>
                            <div className="job-openings-count">
                                {m.matchedSkillCount}/{m.totalRequiredSkills} skills matched
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EmployeeJobPortal;
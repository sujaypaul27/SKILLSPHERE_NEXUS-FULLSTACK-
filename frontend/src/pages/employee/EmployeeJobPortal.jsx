import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import jobOpeningService from '../../services/jobOpeningService';

const EmployeeJobPortal = () => {
    const { user } = useAuth();
    const [matches, setMatches] = useState([]);


    const loadMatches = async () => {
        try {
            const res = await jobOpeningService.getMatchesForEmployee(user.employeeId);
            setMatches(res.data);
        } catch (error) {
            console.error('Error loading matches:', error);
        }
    };
    useEffect(() => {
        loadMatches();
    }, []);


    return (
        <div className="employee-page">
            <h2>Internal Job Portal</h2>

            {matches.length === 0 && <p>No matching job openings found.</p>}

            <div className="dashboard-cards">
                {matches.map(m => (
                    <div key={m.jobId} className="dashboard-card">
                        <h3>{m.title}</h3>
                        <p>{m.department}</p>
                        <p>Match: {m.matchedSkillCount}/{m.totalRequiredSkills} skills ({m.matchPercentage.toFixed(0)}%)</p>
                        <button className="btn-primary">Apply</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
// issue 5 in button race condition solved
export default EmployeeJobPortal;
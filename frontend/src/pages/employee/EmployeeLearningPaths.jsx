import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import learningPathService from '../../services/learningPathService';
import ProgressBar from '../../components/learning/ProgressBar';

const EmployeeLearningPaths = () => {
    const { user } = useAuth();
    const employeeId = user?.employeeId || user?.id;

    const [paths, setPaths] = useState([]);
    const [progressMap, setProgressMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!employeeId) return;
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await learningPathService.getAll();
                setPaths(res.data);

                const progressResults = await Promise.all(
                    res.data.map((p) => learningPathService.getProgress(p.id, employeeId))
                );
                const map = {};
                progressResults.forEach((r) => { map[r.data.learningPathId] = r.data; });
                setProgressMap(map);
            } catch (err) {
                setError('Failed to load learning paths.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [employeeId]);

    if (loading) return <p>Loading learning paths...</p>;
    if (error) return <p>{error}</p>;
    if (paths.length === 0) return <p>No learning paths found.</p>;

    return (
        <div>
            <h2>Learning Paths</h2>
            {paths.map((path) => {
                const progress = progressMap[path.id];
                return (
                    <div key={path.id} className="dashboard-card" style={{ padding: '16px', marginBottom: '12px' }}>
                        <h3>{path.name}</h3>
                        <p style={{ fontSize: '13px', opacity: 0.8 }}>{path.careerTrack}</p>
                        <ProgressBar percentage={progress?.progressPercentage || 0} />
                        <p style={{ fontSize: '13px' }}>
                            {progress ? `${progress.progressPercentage}% (${progress.completedCourses}/${progress.totalCourses} courses)` : '0%'}
                        </p>
                        <ul>
                            {path.courses.map((c) => (
                                <li key={c.id}>{c.courseTitle}</li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default EmployeeLearningPaths;
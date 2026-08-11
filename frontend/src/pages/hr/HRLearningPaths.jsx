import { useEffect, useState } from 'react';
import learningPathService from '../../services/learningPathService';
import learningService from '../../services/learningService';

const HRLearningPaths = () => {
    const [paths, setPaths] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [careerTrack, setCareerTrack] = useState('');
    const [selectedCourseIds, setSelectedCourseIds] = useState([]);
    const [saving, setSaving] = useState(false);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [pathsRes, coursesRes] = await Promise.all([
                learningPathService.getAll(),
                learningService.getAllCourses(),
            ]);
            setPaths(pathsRes.data);
            setCourses(coursesRes.data);
        } catch (err) {
            setError('Failed to load learning paths.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const toggleCourse = (id) => {
        setSelectedCourseIds((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedCourseIds.length === 0) {
            alert('Select at least one course.');
            return;
        }
        setSaving(true);
        try {
            await learningPathService.create({
                name, description, careerTrack, courseIds: selectedCourseIds,
            });
            setName(''); setDescription(''); setCareerTrack(''); setSelectedCourseIds([]);
            setShowForm(false);
            loadData();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create learning path.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Loading learning paths...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Learning Paths</h2>
            <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add Learning Path'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="dashboard-card" style={{ padding: '16px', margin: '12px 0' }}>
                    <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input placeholder="Career Track" value={careerTrack} onChange={(e) => setCareerTrack(e.target.value)} />
                    <div>
                        <p>Select Courses:</p>
                        {courses.map((c) => (
                            <label key={c.id} style={{ display: 'block' }}>
                                <input
                                    type="checkbox"
                                    checked={selectedCourseIds.includes(c.id)}
                                    onChange={() => toggleCourse(c.id)}
                                />
                                {c.courseTitle}
                            </label>
                        ))}
                    </div>
                    <button type="submit" className="primary-btn" disabled={saving}>{saving ? 'Saving...' : 'Save Path'}</button>
                </form>
            )}

            {paths.length === 0 && <p>No learning paths found.</p>}
            {paths.map((path) => (
                <div key={path.id} className="dashboard-card" style={{ padding: '16px', marginBottom: '12px' }}>
                    <h4>{path.name}</h4>
                    <p style={{ fontSize: '13px' }}>{path.careerTrack}</p>
                    <ul>
                        {path.courses.map((c) => <li key={c.id}>{c.courseTitle}</li>)}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default HRLearningPaths;
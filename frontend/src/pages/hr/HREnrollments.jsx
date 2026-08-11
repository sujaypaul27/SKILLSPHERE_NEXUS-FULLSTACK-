import { useEffect, useState } from 'react';
import learningService from '../../services/learningService';

const emptyForm = {
    courseCode: '', courseTitle: '', description: '', instructor: '',
    category: '', courseType: 'ONLINE', difficultyLevel: '', durationHours: '',
    totalModules: '', maxScore: 100, passingScore: 60, rating: '', status: 'ACTIVE',
};

const HRCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const loadCourses = () => {
        setLoading(true);
        setError(null);
        learningService.getAllCourses()
            .then((res) => setCourses(res.data))
            .catch(() => setError('Failed to load courses.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { loadCourses(); }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await learningService.createCourse({
                ...form,
                durationHours: Number(form.durationHours),
                totalModules: Number(form.totalModules),
                maxScore: Number(form.maxScore),
                passingScore: Number(form.passingScore),
                rating: Number(form.rating),
            });
            setForm(emptyForm);
            setShowForm(false);
            loadCourses();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create course.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this course?')) return;
        try {
            await learningService.deleteCourse(id);
            loadCourses();
        } catch (err) {
            alert('Failed to delete course.');
        }
    };

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Course Management</h2>
            <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add Course'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="dashboard-card" style={{ padding: '16px', margin: '12px 0' }}>
                    <input name="courseCode" placeholder="Course Code" value={form.courseCode} onChange={handleChange} required />
                    <input name="courseTitle" placeholder="Course Title" value={form.courseTitle} onChange={handleChange} required />
                    <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                    <input name="instructor" placeholder="Instructor" value={form.instructor} onChange={handleChange} required />
                    <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
                    <select name="courseType" value={form.courseType} onChange={handleChange}>
                        <option value="ONLINE">ONLINE</option>
                        <option value="WORKSHOP">WORKSHOP</option>
                        <option value="WEBINAR">WEBINAR</option>
                        <option value="BOOTCAMP">BOOTCAMP</option>
                    </select>
                    <input name="difficultyLevel" placeholder="Difficulty Level" value={form.difficultyLevel} onChange={handleChange} />
                    <input name="durationHours" type="number" placeholder="Duration Hours" value={form.durationHours} onChange={handleChange} required />
                    <input name="totalModules" type="number" placeholder="Total Modules" value={form.totalModules} onChange={handleChange} />
                    <input name="maxScore" type="number" placeholder="Max Score" value={form.maxScore} onChange={handleChange} />
                    <input name="passingScore" type="number" placeholder="Passing Score" value={form.passingScore} onChange={handleChange} />
                    <input name="rating" type="number" step="0.1" placeholder="Rating" value={form.rating} onChange={handleChange} />
                    <button type="submit" className="primary-btn" disabled={saving}>{saving ? 'Saving...' : 'Save Course'}</button>
                </form>
            )}

            {courses.length === 0 && <p>No courses found.</p>}
            {courses.map((course) => (
                <div key={course.id} className="dashboard-card" style={{ padding: '16px', marginBottom: '12px' }}>
                    <h4>{course.courseTitle} ({course.courseCode})</h4>
                    <p style={{ fontSize: '13px' }}>
                        {course.courseType} | {course.durationHours}h | {course.instructor} | Rating: {course.rating}/5
                    </p>
                    <button className="primary-btn" onClick={() => handleDelete(course.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default HRCourses;
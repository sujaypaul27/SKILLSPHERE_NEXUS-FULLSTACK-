import { useEffect, useState } from 'react';
import learningService from '../../services/learningService';
import enrollmentService from '../../services/enrollmentService';
import completionService from '../../services/completionService';
import StatCard from '../../components/learning/StatCard';

const HRLearningDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const [coursesRes, enrollRes, completedRes] = await Promise.all([
                    learningService.getAllCourses(),
                    enrollmentService.getAll(),
                    completionService.getAllCompleted(),
                ]);
                setCourses(coursesRes.data);
                setEnrollments(enrollRes.data);
                setCompleted(completedRes.data);
            } catch (err) {
                setError('Failed to load dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <p>Loading dashboard...</p>;
    if (error) return <p>{error}</p>;

    const completionRate = enrollments.length > 0
        ? Math.round((completed.length / enrollments.length) * 100)
        : 0;

    return (
        <div>
            <h2>Learning Management Dashboard</h2>
            <div className="lm-stats-grid">
                <StatCard label="Courses" value={courses.length} sublabel="Available" icon="📚" />
                <StatCard label="Enrollments" value={enrollments.length} sublabel="Total" icon="📝" />
                <StatCard label="Completion" value={`${completionRate}%`} sublabel="Rate" icon="🏆" />
            </div>

            <h3>Courses</h3>
            {courses.length === 0 && <p>No courses found.</p>}
            {courses.map((course) => {
                const courseEnrollments = enrollments.filter((e) => e.courseId === course.id);
                const courseCompleted = courseEnrollments.filter((e) => e.completionStatus === 'COMPLETED');
                return (
                    <div key={course.id} className="dashboard-card" style={{ padding: '16px', marginBottom: '12px' }}>
                        <h4>{course.courseTitle}</h4>
                        <p style={{ fontSize: '13px' }}>
                            Duration: {course.durationHours}h | Type: {course.courseType} | Instructor: {course.instructor}
                        </p>
                        <p style={{ fontSize: '13px' }}>
                            Enrolled: {courseEnrollments.length} employees | Completed: {courseCompleted.length}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default HRLearningDashboard;